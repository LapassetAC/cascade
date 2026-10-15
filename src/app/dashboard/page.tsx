import { Metadata } from "next";
import Link from "next/link";
import {
  getMaintenanceAnnualTotal,
  getOngoingProjects,
  getWonDeals,
} from "@/utils/attio";
import { getTrackedHoursByProject, normalizeName } from "@/utils/clockify";

export const metadata: Metadata = {
  title: "Dashboard - Studio Cascade",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const TEAM_SIZE = 2;
const MONTHLY_TARGET_PER_PERSON = 2500;
const YEARLY_TARGET = MONTHLY_TARGET_PER_PERSON * TEAM_SIZE * 12;

// Objectif de CA du studio sur 2026 + 2027 pour le prêt immo
const LOAN_TARGET = 88000;
const LOAN_FROM = "2026-01";
const LOAN_TO = "2027-12";
const LOAN_MONTHS = 24;

const HOURLY_RATE = 80;

type Period = "annee" | "12-mois";

const PERIODS: { value: Period; label: string; remainingLabel: string }[] = [
  {
    value: "annee",
    label: "Année en cours",
    remainingLabel: "Reste à facturer d'ici fin décembre",
  },
  {
    value: "12-mois",
    label: "12 mois glissants",
    remainingLabel: "Reste à facturer sur 12 mois glissants",
  },
];

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const hoursFormat = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 1,
});

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ periode?: string }>;
}) {
  const { periode } = await searchParams;
  const period = PERIODS.find((p) => p.value === periode) ?? PERIODS[0];

  const [deals, maintenanceAnnual, ongoingProjects, trackedHours] =
    await Promise.all([
      getWonDeals(),
      getMaintenanceAnnualTotal(),
      getOngoingProjects(),
      getTrackedHoursByProject(),
    ]);

  const [year, month] = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
  })
    .format(new Date())
    .split("-")
    .map(Number);

  // Nombre de mois de la période, mois en cours inclus
  const monthCount = period.value === "annee" ? month : 12;
  const from = new Date(Date.UTC(year, month - monthCount, 1))
    .toISOString()
    .slice(0, 7);

  const dealsTotal = deals
    .filter((deal) => deal.wonDate && deal.wonDate.slice(0, 7) >= from)
    .reduce((sum, deal) => sum + deal.value, 0);

  // Maintenance comptée au prorata des mois pour la moyenne,
  // et sur l'année entière pour l'objectif annuel
  const average =
    (dealsTotal / monthCount + maintenanceAnnual / 12) / TEAM_SIZE;
  const remaining = YEARLY_TARGET - dealsTotal - maintenanceAnnual;

  // Prêt immo : mois restants jusqu'à fin 2027, mois en cours inclus
  const loanMonthsLeft = Math.min(
    LOAN_MONTHS,
    Math.max(0, (2027 - year) * 12 + 12 - month + 1),
  );
  const loanMonthsDone = LOAN_MONTHS - loanMonthsLeft;
  const loanDeals = deals
    .filter(
      (deal) =>
        deal.wonDate &&
        deal.wonDate.slice(0, 7) >= LOAN_FROM &&
        deal.wonDate.slice(0, 7) <= LOAN_TO,
    )
    .reduce((sum, deal) => sum + deal.value, 0);
  const maintenanceMonthly = maintenanceAnnual / 12;
  const loanDone = loanDeals + maintenanceMonthly * loanMonthsDone;
  const loanProgress = Math.min(1, loanDone / LOAN_TARGET);
  const loanDelta = loanDone - (LOAN_TARGET * loanMonthsDone) / LOAN_MONTHS;
  // La maintenance des mois restants est considérée comme acquise :
  // le reste correspond aux nouveaux deals à signer
  const loanToSign = LOAN_TARGET - loanDeals - maintenanceMonthly * LOAN_MONTHS;

  // Temps passé (Clockify) / temps prévu (montant du deal au taux horaire),
  // projets sans équivalent Clockify ignorés
  const projects = ongoingProjects
    .flatMap(({ name, value }) => {
      const spent = trackedHours.get(normalizeName(name));
      if (spent === undefined) return [];
      const planned = value / HOURLY_RATE;
      return [{ name, value, spent, planned, progress: spent / planned }];
    })
    .sort((a, b) => b.progress - a.progress);

  return (
    <main className="min-h-screen px-4 py-10 md:px-10 md:py-16 max-w-5xl mx-auto">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h1 className="title font-black">Dashboard</h1>
        <nav className="flex gap-2">
          {PERIODS.map(({ value, label }) => (
            <Link
              key={value}
              href={`/dashboard?periode=${value}`}
              className={`rounded-full border border-[#0b0bca] px-4 py-1 ${
                period.value === value ? "bg-[#0b0bca] !text-[#fcfaf7]" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <p className="opacity-60">
            CA moyen / mois / personne, maintenance comprise
          </p>
          <p className="title font-black mt-2">{euros.format(average)}</p>
          <p className="mt-2">
            Objectif : {euros.format(MONTHLY_TARGET_PER_PERSON)}
          </p>
        </div>
        <div>
          <p className="opacity-60">{period.remainingLabel}</p>
          <p className="title font-black mt-2">
            {remaining > 0 ? euros.format(remaining) : "Objectif atteint"}
          </p>
          <p className="mt-2">
            Sur un objectif de {euros.format(YEARLY_TARGET)} / an
          </p>
        </div>
      </section>

      <section className="mt-16">
        <p className="opacity-60">
          Objectif prêt immo · CA Cascade 2026 + 2027
        </p>
        <div className="mt-4 h-4 rounded-full border border-[#0b0bca] overflow-hidden">
          <div
            className="h-full bg-[#0b0bca]"
            style={{ width: `${loanProgress * 100}%` }}
          />
        </div>
        <p className="mt-2">
          {euros.format(loanDone)} / {euros.format(LOAN_TARGET)} (
          {Math.round(loanProgress * 100)} %)
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <p className="opacity-60">Reste à signer d'ici fin 2027</p>
            <p className="title font-black mt-2">
              {loanToSign > 0 ? euros.format(loanToSign) : "Objectif atteint"}
            </p>
            <p className="mt-2">
              Maintenance à venir déjà déduite (
              {euros.format(maintenanceMonthly * loanMonthsLeft)})
            </p>
          </div>
          {loanToSign > 0 && loanMonthsLeft > 0 && (
            <div>
              <p className="opacity-60">Rythme nécessaire</p>
              <p className="title font-black mt-2">
                {euros.format(loanToSign / loanMonthsLeft)} / mois
              </p>
              <p className="mt-2">
                Sur {loanMonthsLeft} mois ·{" "}
                {loanDelta >= 0 ? "en avance" : "en retard"} de{" "}
                {euros.format(Math.abs(loanDelta))} sur la trajectoire
              </p>
            </div>
          )}
        </div>
      </section>

      {projects.length > 0 && (
        <section className="mt-16">
          <p className="opacity-60">
            Projets en cours · temps passé / temps prévu ({HOURLY_RATE} €/h)
          </p>
          <ul className="mt-4 flex flex-col gap-8">
            {projects.map(({ name, value, spent, planned, progress }) => {
              const over = progress > 1;
              return (
                <li key={name}>
                  <p>{name}</p>
                  <div
                    className={`mt-2 h-4 rounded-full border overflow-hidden ${
                      over ? "border-red-600" : "border-[#0b0bca]"
                    }`}
                  >
                    <div
                      className={`h-full ${over ? "bg-red-600" : "bg-[#0b0bca]"}`}
                      style={{ width: `${Math.min(1, progress) * 100}%` }}
                    />
                  </div>
                  <p className="mt-2">
                    {hoursFormat.format(spent)} h / {hoursFormat.format(planned)}{" "}
                    h ({Math.round(progress * 100)} %) · {euros.format(value)}
                    {over &&
                      ` · dépassement de ${hoursFormat.format(spent - planned)} h`}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}
