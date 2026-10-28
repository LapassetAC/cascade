import { Metadata } from "next";
import Link from "next/link";
import {
  getDashboardData,
  HOURLY_RATE,
  MONTHLY_TARGET_PER_PERSON,
  Period,
  WEEKLY_HOURS_TARGET,
  YEARLY_TARGET,
} from "@/utils/dashboard";

export const metadata: Metadata = {
  title: "Dashboard - Studio Cascade",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

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

const FOCUS_LABELS = {
  commercial: "Priorité au commercial",
  equilibre: "Équilibre commercial / production",
  production: "Priorité à la production",
};

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

  const { revenue, loan, projects, people, advice } = await getDashboardData(
    period.value,
  );

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
          <p className="title font-black mt-2">
            {euros.format(revenue.average)}
          </p>
          <p className="mt-2">
            Objectif : {euros.format(MONTHLY_TARGET_PER_PERSON)}
          </p>
        </div>
        <div>
          <p className="opacity-60">{period.remainingLabel}</p>
          <p className="title font-black mt-2">
            {revenue.remaining > 0
              ? euros.format(revenue.remaining)
              : "Objectif atteint"}
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
            style={{ width: `${loan.progress * 100}%` }}
          />
        </div>
        <p className="mt-2">
          {euros.format(loan.done)} / {euros.format(loan.target)} (
          {Math.round(loan.progress * 100)} %)
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <p className="opacity-60">Reste à signer d'ici fin 2027</p>
            <p className="title font-black mt-2">
              {loan.toSign > 0 ? euros.format(loan.toSign) : "Objectif atteint"}
            </p>
            <p className="mt-2">
              Maintenance à venir déjà déduite (
              {euros.format(loan.maintenanceLeft)})
            </p>
          </div>
          {loan.toSign > 0 && loan.monthsLeft > 0 && (
            <div>
              <p className="opacity-60">Rythme nécessaire</p>
              <p className="title font-black mt-2">
                {euros.format(loan.toSign / loan.monthsLeft)} / mois
              </p>
              <p className="mt-2">
                Sur {loan.monthsLeft} mois ·{" "}
                {loan.delta >= 0 ? "en avance" : "en retard"} de{" "}
                {euros.format(Math.abs(loan.delta))} sur la trajectoire
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mt-16">
        <p className="opacity-60">Conseil</p>
        <p className="title font-black mt-2">{FOCUS_LABELS[advice.focus]}</p>
        <ul className="mt-2">
          {advice.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </section>

      {people.length > 0 && (
        <section className="mt-16">
          <p className="opacity-60">
            Cette semaine · objectif {WEEKLY_HOURS_TARGET} h / personne
          </p>
          <div className="mt-4 grid gap-8 md:grid-cols-2">
            {people.map(({ name, week, last30 }) => (
              <div key={name}>
                <p>{name}</p>
                <p className="title font-black mt-2">
                  {hoursFormat.format(week.hours)} h
                </p>
                <p className="mt-2">
                  dont {hoursFormat.format(week.commercial)} h de commercial ·{" "}
                  {Math.round(last30.commercialShare * 100)} % de commercial
                  sur 30 jours
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

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
