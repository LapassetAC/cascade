const ATTIO_API_URL = "https://api.attio.com/v2";
const WON_STAGE = "Won 🎉";

export type WonDeal = {
  id: string;
  name: string;
  value: number;
  wonDate: string | null; // "YYYY-MM-DD"
  url: string;
};

type AttioRecord = {
  id: { record_id: string };
  web_url: string;
  values: {
    name: { value: string }[];
    value: { currency_value: number }[];
    won_date: { value: string }[];
  };
};

export type MaintenanceContract = {
  id: string;
  client: string;
  amount: number; // annuel
  nextBilling: string | null; // "YYYY-MM-DD"
  url: string;
};

type AttioListEntry = {
  id: { entry_id: string };
  parent_record_id: string;
  entry_values: {
    montant_annuel: { currency_value: number }[];
    prochaine_facturation: { value: string }[];
  };
};

type AttioCompany = {
  id: { record_id: string };
  web_url: string;
  values: { name: { value: string }[] };
};

// Récupère toutes les pages d'une requête "query" de l'API Attio
async function queryAll<T>(path: string, body: object = {}): Promise<T[]> {
  const apiKey = process.env.ATTIO_API_KEY;
  if (!apiKey) throw new Error("ATTIO_API_KEY manquante");

  const limit = 500;
  const results: T[] = [];

  for (let offset = 0; ; offset += limit) {
    const res = await fetch(`${ATTIO_API_URL}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body, limit, offset }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Attio ${res.status}: ${await res.text()}`);

    const { data } = (await res.json()) as { data: T[] };
    results.push(...data);
    if (data.length < limit) return results;
  }
}

export async function getMaintenanceContracts(): Promise<
  MaintenanceContract[]
> {
  const entries = await queryAll<AttioListEntry>(
    "/lists/contrats_maintenance/entries/query"
  );
  if (entries.length === 0) return [];

  const companies = await queryAll<AttioCompany>(
    "/objects/companies/records/query",
    {
      filter: {
        record_id: { $in: entries.map((entry) => entry.parent_record_id) },
      },
    }
  );
  const companiesById = new Map(
    companies.map((company) => [company.id.record_id, company])
  );

  return entries.map((entry) => {
    const company = companiesById.get(entry.parent_record_id);
    return {
      id: entry.id.entry_id,
      client: company?.values.name[0]?.value ?? "Sans nom",
      amount: entry.entry_values.montant_annuel[0]?.currency_value ?? 0,
      nextBilling: entry.entry_values.prochaine_facturation[0]?.value ?? null,
      url: company?.web_url ?? "",
    };
  });
}

export async function getWonDeals(): Promise<WonDeal[]> {
  const records = await queryAll<AttioRecord>("/objects/deals/records/query", {
    filter: { stage: WON_STAGE },
  });

  return records.map((record) => ({
    id: record.id.record_id,
    name: record.values.name[0]?.value ?? "Sans nom",
    value: record.values.value[0]?.currency_value ?? 0,
    wonDate: record.values.won_date[0]?.value ?? null,
    url: record.web_url,
  }));
}
