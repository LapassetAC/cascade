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

async function clockifyFetch<T>(path: string): Promise<T> {
  const apiKey = process.env.CLOCKIFY_API_KEY;
  if (!apiKey) throw new Error("CLOCKIFY_API_KEY manquante");

  const res = await fetch(`${CLOCKIFY_API_URL}${path}`, {
    headers: { "X-Api-Key": apiKey },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Clockify ${res.status}: ${await res.text()}`);

  return (await res.json()) as T;
}

async function getWorkspaceId(): Promise<string> {
  if (process.env.CLOCKIFY_WORKSPACE_ID) return process.env.CLOCKIFY_WORKSPACE_ID;

  const user = await clockifyFetch<{ activeWorkspace: string }>("/user");
  return user.activeWorkspace;
}

// Heures suivies par projet actif, indexées par nom normalisé.
// Le champ "duration" des projets donne le total suivi, sans passer par
// l'API des rapports (limitée en période sur le plan gratuit)
export async function getTrackedHoursByProject(): Promise<Map<string, number>> {
  const workspaceId = await getWorkspaceId();
  const projects = await clockifyFetch<ClockifyProject[]>(
    `/workspaces/${workspaceId}/projects?archived=false&page-size=5000`
  );

  const hours = new Map<string, number>();
  for (const { name, duration } of projects) {
    const key = normalizeName(name);
    hours.set(key, (hours.get(key) ?? 0) + durationToHours(duration));
  }
  return hours;
}
