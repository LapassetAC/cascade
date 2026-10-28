import { NextRequest, NextResponse } from "next/server";
import { getDashboardData } from "@/utils/dashboard";

export const dynamic = "force-dynamic";

// Chiffres du dashboard en JSON, lus par les skills /today et /week de Claude
// et par le hook de début de session. Protégé comme /dashboard (middleware)
export async function GET(request: NextRequest) {
  const periode = request.nextUrl.searchParams.get("periode");
  const data = await getDashboardData(
    periode === "12-mois" ? "12-mois" : "annee",
  );
  return NextResponse.json(data);
}
