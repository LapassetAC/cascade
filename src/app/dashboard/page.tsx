import { Metadata } from "next";
import Link from "next/link";
import { getMaintenanceContracts, getWonDeals } from "@/utils/attio";

export const metadata: Metadata = {
  title: "Dashboard - Studio Cascade",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Period = "annee" | "12-mois";

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const monthLabel = new Intl.DateTimeFormat("fr-FR", {
  month: "short",
  year: "2-digit",
  timeZone: "UTC",
});

const shortDate = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const monthInitial = new Intl.DateTimeFormat("fr-FR", {
  month: "narrow",
  timeZone: "UTC",
});

// Clés "YYYY-MM" des mois de la période, du plus ancien au mois en cours (inclus)
function getMonths(period: Period): string[] {
  const [year, month] = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
  })
    .format(new Date())
    .split("-")
    .map(Number);

  const count = period === "annee" ? month : 12;
  return Array.from({ length: count }, (_, i) =>
    new Date(Date.UTC(year, month - count + i, 1)).toISOString().slice(0, 7)
  );
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ periode?: string }>;
}) {
  const { periode } = await searchParams;
  const period: Period = periode === "12-mois" ? "12-mois" : "annee";

  const [deals, contracts] = await Promise.all([
    getWonDeals(),
    getMaintenanceContracts(),
  ]);
  const months = getMonths(period);

  const totals = new Map(months.map((month) => [month, 0]));
  let dealCount = 0;
  for (const deal of deals) {
    const month = deal.wonDate?.slice(0, 7);
    if (month && totals.has(month)) {
      totals.set(month, totals.get(month)! + deal.value);
      dealCount++;
    }
  }

  const total = [...totals.values()].reduce((sum, value) => sum + value, 0);
  const average = total / months.length;
  const max = Math.max(...totals.values(), average, 1);
  const undated = deals.filter((deal) => !deal.wonDate);

  const maintenanceTotal = contracts.reduce(
    (sum, contract) => sum + contract.amount,
    0
  );
  // Prochaines facturations d'abord, contrats sans date à la fin
  const sortedContracts = [...contracts].sort((a, b) =>
    (a.nextBilling ?? "9999").localeCompare(b.nextBilling ?? "9999")
  );

  return (
    <main className="min-h-screen px-4 py-10 md:px-10 md:py-16 max-w-5xl mx-auto">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h1 className="title font-black">Dashboard</h1>
        <nav className="flex gap-2">
          {(
            [
              ["annee", "Année en cours"],
              ["12-mois", "12 mois glissants"],
            ] as const
          ).map(([value, label]) => (
            <Link
              key={value}
              href={`/dashboard?periode=${value}`}
              className={`rounded-full border border-[#0b0bca] px-4 py-1 ${
                period === value ? "bg-[#0b0bca] !text-[#fcfaf7]" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <section className="mt-12 grid gap-8 md:grid-cols-3">
        <div>
          <p className="opacity-60">CA moyen / mois</p>
          <p className="title font-black mt-2">{euros.format(average)}</p>
        </div>
        <div>
          <p className="opacity-60">CA total</p>
          <p className="title font-black mt-2">{euros.format(total)}</p>
        </div>
        <div>
          <p className="opacity-60">Deals gagnés</p>
          <p className="title font-black mt-2">{dealCount}</p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-black">CA par mois</h2>
        <p className="opacity-60">
          Selon la date « Won date » des deals, sur {months.length} mois (mois
          en cours inclus)
        </p>

        <div className="relative mt-8 h-64 border-b border-[#0b0bca]/30">
          <div
            className="absolute inset-x-0 z-10 border-t-2 border-dashed border-[#0b0bca]/50 pointer-events-none"
            style={{ bottom: `${(average / max) * 100}%` }}
          >
            <span className="absolute left-0 -top-4 rounded bg-[#fcfaf7] px-1 !text-[14px] !leading-[18px]">
              moyenne {euros.format(average)}
            </span>
          </div>
          <div className="flex h-full items-end gap-[2px]">
            {months.map((month) => {
              const value = totals.get(month)!;
              return (
                <div
                  key={month}
                  className="group relative flex h-full flex-1 items-end justify-center"
                >
                  <div
                    className="w-full max-w-12 rounded-t-[4px] bg-[#0b0bca] group-hover:opacity-80"
                    style={{ height: `${(value / max) * 100}%` }}
                  />
                  <span className="absolute bottom-full mb-1 hidden whitespace-nowrap rounded bg-[#0b0bca] px-2 py-1 !text-[14px] !leading-[18px] text-[#fcfaf7] group-hover:block">
                    {monthLabel.format(new Date(`${month}-01`))} ·{" "}
                    {euros.format(value)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-2 flex gap-[2px]">
          {months.map((month) => (
            <span
              key={month}
              className="flex-1 text-center !text-[12px] md:!text-[14px] opacity-60"
            >
              <span className="md:hidden">
                {monthInitial.format(new Date(`${month}-01`))}
              </span>
              <span className="hidden md:inline">
                {monthLabel.format(new Date(`${month}-01`))}
              </span>
            </span>
          ))}
        </div>

        <table className="mt-10 w-full">
          <tbody>
            {months.map((month) => (
              <tr key={month} className="border-b border-[#0b0bca]/15">
                <td className="py-1">
                  <span>{monthLabel.format(new Date(`${month}-01`))}</span>
                </td>
                <td className="py-1 text-right tabular-nums">
                  <span>{euros.format(totals.get(month)!)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-16">
        <h2 className="font-black">Maintenance</h2>
        <p className="opacity-60">
          Contrats en cours, quelle que soit la période sélectionnée
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div>
            <p className="opacity-60">CA maintenance annuel</p>
            <p className="title font-black mt-2">
              {euros.format(maintenanceTotal)}
            </p>
          </div>
          <div>
            <p className="opacity-60">Soit par mois</p>
            <p className="title font-black mt-2">
              {euros.format(maintenanceTotal / 12)}
            </p>
          </div>
          <div>
            <p className="opacity-60">Contrats</p>
            <p className="title font-black mt-2">{contracts.length}</p>
          </div>
        </div>

        <table className="mt-10 w-full">
          <thead>
            <tr className="border-b border-[#0b0bca]/30 text-left">
              <th className="py-1 font-normal">
                <span className="opacity-60">Client</span>
              </th>
              <th className="py-1 font-normal">
                <span className="opacity-60">Prochaine facturation</span>
              </th>
              <th className="py-1 text-right font-normal">
                <span className="opacity-60">Montant annuel</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedContracts.map((contract) => (
              <tr key={contract.id} className="border-b border-[#0b0bca]/15">
                <td className="py-1 pr-4">
                  <a
                    href={contract.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {contract.client}
                  </a>
                </td>
                <td className="py-1 pr-4">
                  <span>
                    {contract.nextBilling
                      ? shortDate.format(new Date(contract.nextBilling))
                      : "—"}
                  </span>
                </td>
                <td className="py-1 text-right tabular-nums">
                  <span>{euros.format(contract.amount)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {undated.length > 0 && (
        <section className="mt-16 rounded-lg border border-[#0b0bca] p-6">
          <h2 className="font-black">
            {undated.length} deals gagnés sans « Won date »
          </h2>
          <p className="opacity-60">
            Ils ne sont pas comptés dans les chiffres ci-dessus (
            {euros.format(undated.reduce((sum, deal) => sum + deal.value, 0))}
            ). Complète leur date dans Attio.
          </p>
          <ul className="mt-4">
            {undated.map((deal) => (
              <li
                key={deal.id}
                className="flex justify-between gap-4 border-b border-[#0b0bca]/15 py-1"
              >
                <a
                  href={deal.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {deal.name}
                </a>
                <span className="tabular-nums">{euros.format(deal.value)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
