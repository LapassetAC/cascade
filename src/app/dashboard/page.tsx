import { Metadata } from "next";
import Link from "next/link";
import { getMaintenanceAnnualTotal, getWonDeals } from "@/utils/attio";

export const metadata: Metadata = {
  title: "Dashboard - Studio Cascade",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const TEAM_SIZE = 2;
const MONTHLY_TARGET_PER_PERSON = 2500;
const YEARLY_TARGET = MONTHLY_TARGET_PER_PERSON * TEAM_SIZE * 12;

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

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ periode?: string }>;
}) {
  const { periode } = await searchParams;
  const period = PERIODS.find((p) => p.value === periode) ?? PERIODS[0];

  const [deals, maintenanceAnnual] = await Promise.all([
    getWonDeals(),
    getMaintenanceAnnualTotal(),
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
    </main>
  );
}
