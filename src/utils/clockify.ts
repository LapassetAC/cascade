import { unstable_cache } from "next/cache";

const CLOCKIFY_API_URL = "https://api.clockify.me/api/v1";

type ClockifyProject = {
  name: string;
  duration: string; // durée ISO 8601, ex. "PT35H10M"
};

// Nom comparable entre Attio et Clockify : sans casse, accents ni espaces superflus
export function normalizeName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

// "PT35H10M20S" -> 35.17
function durationToHours(duration: string): number {
  const [, h, m, s] = (
    duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/) ?? []
  ).map((part) => Number(part ?? 0));
  return h + m / 60 + s / 3600 || 0;
}

// Le plan gratuit de Clockify limite l'API à 30 requêtes par heure pour tout
// l'espace, partagées avec nos autres outils (Raycast, scripts) : chaque
// réponse est gardée 30 minutes, quel que soit le nombre d'appels au
// dashboard (page, route JSON lue par Claude). Soit 4 requêtes par
// rafraîchissement, 8 par heure au plus
const CACHE_SECONDS = 30 * 60;

// Espace Clockify « Cascade » : fixe, évite un appel à /user
const WORKSPACE_ID = "66e0416dfba3245061a9a661";

const cachedClockifyFetch = unstable_cache(
  async (path: string): Promise<unknown> => {
    const apiKey = process.env.CLOCKIFY_API_KEY;
    if (!apiKey) throw new Error("CLOCKIFY_API_KEY manquante");

    const res = await fetch(`${CLOCKIFY_API_URL}${path}`, {
      headers: { "X-Api-Key": apiKey },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Clockify ${res.status}: ${await res.text()}`);

    return res.json();
  },
  ["clockify"],
  { revalidate: CACHE_SECONDS }
);

async function clockifyFetch<T>(path: string): Promise<T> {
  return (await cachedClockifyFetch(path)) as T;
}

// Heures suivies par projet actif, indexées par nom normalisé.
// Le champ "duration" des projets donne le total suivi, sans passer par
// l'API des rapports (limitée en période sur le plan gratuit)
export async function getTrackedHoursByProject(): Promise<Map<string, number>> {
  const projects = await clockifyFetch<ClockifyProject[]>(
    `/workspaces/${WORKSPACE_ID}/projects?archived=false&page-size=5000`
  );

  const hours = new Map<string, number>();
  for (const { name, duration } of projects) {
    const key = normalizeName(name);
    hours.set(key, (hours.get(key) ?? 0) + durationToHours(duration));
  }
  return hours;
}

type ClockifyUser = { id: string; name: string };

type ClockifyTimeEntry = {
  timeInterval: { start: string; duration: string | null };
  project?: { name: string } | null;
};

export type DayHours = {
  date: string; // "YYYY-MM-DD", heure de Paris
  hours: number;
  commercial: number;
};

export type PersonHours = {
  name: string;
  days: DayHours[]; // jours avec du temps suivi, du plus ancien au plus récent
};

const COMMERCIAL_PROJECT = "commercial";

const parisDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Paris",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// Heures suivies par personne et par jour depuis `since`, dont le temps
// passé sur le projet "Commercial". Un chrono en cours compte jusqu'à maintenant
export async function getTrackedHoursByPerson(
  since: Date
): Promise<PersonHours[]> {
  const users = await clockifyFetch<ClockifyUser[]>(
    `/workspaces/${WORKSPACE_ID}/users`
  );

  return Promise.all(
    users.map(async ({ id, name }) => {
      const entries = await clockifyFetch<ClockifyTimeEntry[]>(
        `/workspaces/${WORKSPACE_ID}/user/${id}/time-entries?start=${since.toISOString()}&hydrated=true&page-size=1000`
      );

      const days = new Map<string, DayHours>();
      for (const { timeInterval, project } of entries) {
        const start = new Date(timeInterval.start);
        const hours = timeInterval.duration
          ? durationToHours(timeInterval.duration)
          : (Date.now() - start.getTime()) / 3_600_000;
        const date = parisDate.format(start);
        const day = days.get(date) ?? { date, hours: 0, commercial: 0 };
        day.hours += hours;
        if (project && normalizeName(project.name) === COMMERCIAL_PROJECT) {
          day.commercial += hours;
        }
        days.set(date, day);
      }

      return {
        name,
        days: [...days.values()].sort((a, b) => a.date.localeCompare(b.date)),
      };
    })
  );
}
