const ATTIO_API_URL = "https://api.attio.com/v2";
const WON_STAGE = "Won 🎉";

export type WonDeal = {
  value: number;
  wonDate: string | null; // "YYYY-MM-DD"
};

type AttioRecord = {
  values: {
    value: { currency_value: number }[];
    won_date: { value: string }[];
  };
};

type AttioListEntry = {
  entry_values: {
    montant_annuel: { currency_value: number }[];
  };
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

export async function getWonDeals(): Promise<WonDeal[]> {
  const records = await queryAll<AttioRecord>("/objects/deals/records/query", {
    filter: { stage: WON_STAGE },
  });

  return records.map((record) => ({
    value: record.values.value[0]?.currency_value ?? 0,
    wonDate: record.values.won_date[0]?.value ?? null,
  }));
}

export type OngoingProject = {
  name: string;
  company: string;
  value: number;
};

type AttioProjectRecord = {
  values: {
    name: { value: string }[];
    value: { currency_value: number }[];
    associated_company: { target_record_id: string }[];
  };
};

type AttioCompanyRecord = {
  id: { record_id: string };
  values: { name: { value: string }[] };
};

// Noms des entreprises, indexés par record_id
async function getCompanyNames(ids: string[]): Promise<Map<string, string>> {
  if (ids.length === 0) return new Map();

  const records = await queryAll<AttioCompanyRecord>(
    "/objects/companies/records/query",
    { filter: { record_id: { $in: ids } } }
  );
  return new Map(
    records.map((record) => [
      record.id.record_id,
      record.values.name[0]?.value ?? "",
    ])
  );
}

// Projets signés mais pas encore facturés
export async function getOngoingProjects(): Promise<OngoingProject[]> {
  const records = await queryAll<AttioProjectRecord>(
    "/objects/deals/records/query",
    { filter: { stage: WON_STAGE, facture: false } }
  );

  const companyId = (record: AttioProjectRecord) =>
    record.values.associated_company[0]?.target_record_id;
  const companies = await getCompanyNames(
    records.flatMap((record) => companyId(record) ?? [])
  );

  return records
    .map((record) => ({
      name: record.values.name[0]?.value ?? "",
      company: companies.get(companyId(record) ?? "") ?? "",
      value: record.values.value[0]?.currency_value ?? 0,
    }))
    .filter((project) => project.name && project.value > 0);
}

export type OpenDeal = {
  name: string;
  stage: string;
  value: number;
  createdAt: string; // "YYYY-MM-DD"
};

type AttioOpenDealRecord = {
  created_at: string;
  values: {
    name: { value: string }[];
    stage: { status: { title: string } }[];
    value: { currency_value: number }[];
  };
};

// Deals en cours de négociation : "Lead" (prospect chaud) et "In Progress"
export async function getOpenDeals(): Promise<OpenDeal[]> {
  const records = await queryAll<AttioOpenDealRecord>(
    "/objects/deals/records/query",
    { filter: { $or: [{ stage: "Lead" }, { stage: "In Progress" }] } }
  );

  return records.map((record) => ({
    name: record.values.name[0]?.value ?? "",
    stage: record.values.stage[0]?.status.title ?? "",
    value: record.values.value[0]?.currency_value ?? 0,
    createdAt: record.created_at.slice(0, 10),
  }));
}

// Somme des montants annuels de la liste "Contrats Maintenance"
export async function getMaintenanceAnnualTotal(): Promise<number> {
  const entries = await queryAll<AttioListEntry>(
    "/lists/contrats_maintenance/entries/query"
  );

  return entries.reduce(
    (sum, entry) =>
      sum + (entry.entry_values.montant_annuel[0]?.currency_value ?? 0),
    0
  );
}
