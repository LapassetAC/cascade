import {
  getMaintenanceAnnualTotal,
  getOngoingProjects,
  getOpenDeals,
  getWonDeals,
} from "@/utils/attio";
import {
  getTrackedHoursByPerson,
  getTrackedHoursByProject,
  normalizeName,
} from "@/utils/clockify";

export const TEAM_SIZE = 2;
export const MONTHLY_TARGET_PER_PERSON = 2500;
export const YEARLY_TARGET = MONTHLY_TARGET_PER_PERSON * TEAM_SIZE * 12;

// Objectif de CA du studio sur 2026 + 2027 pour le prêt immo
export const LOAN_TARGET = 88000;
const LOAN_FROM = "2026-01";
const LOAN_TO = "2027-12";
const LOAN_MONTHS = 24;

export const HOURLY_RATE = 80;

// Temps de travail visé, par personne
export const DAILY_HOURS_TARGET = 4;
export const WEEKLY_HOURS_TARGET = 20;
// Part de commercial à garder même quand le travail signé suffit
export const COMMERCIAL_SHARE_MIN = 0.15;
// Part du temps prévu à partir de laquelle un projet est signalé
export const OVERRUN_WARNING = 0.8;
// Un deal ouvert créé il y a plus longtemps ne compte plus comme prospect récent
const RECENT_DEAL_DAYS = 60;
const MIN_RECENT_DEALS = 2;

export type Period = "annee" | "12-mois";

export type Focus = "commercial" | "equilibre" | "production";

const FOCUS_LEVELS: Focus[] = ["commercial", "equilibre", "production"];

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const decimal = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 1,
});

const parisDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Paris",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// "2026-10-28" + 3 -> "2026-10-31"
function addDays(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

export async function getDashboardData(period: Period) {
  const today = parisDate.format(new Date());
  const [year, month] = today.split("-").map(Number);

  const [deals, maintenanceAnnual, ongoingProjects, trackedHours, openDeals, tracked] =
    await Promise.all([
      getWonDeals(),
      getMaintenanceAnnualTotal(),
      getOngoingProjects(),
      getTrackedHoursByProject(),
      getOpenDeals(),
      getTrackedHoursByPerson(new Date(`${addDays(today, -35)}T00:00:00Z`)),
    ]);

  // Nombre de mois de la période, mois en cours inclus
  const monthCount = period === "annee" ? month : 12;
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
  const loan = {
    target: LOAN_TARGET,
    done: loanDone,
    progress: Math.min(1, loanDone / LOAN_TARGET),
    delta: loanDone - (LOAN_TARGET * loanMonthsDone) / LOAN_MONTHS,
    // La maintenance des mois restants est considérée comme acquise :
    // le reste correspond aux nouveaux deals à signer
    toSign: LOAN_TARGET - loanDeals - maintenanceMonthly * LOAN_MONTHS,
    monthsLeft: loanMonthsLeft,
    maintenanceLeft: maintenanceMonthly * loanMonthsLeft,
  };

  // Temps passé (Clockify) / temps prévu (montant du deal au taux horaire)
  const projects = ongoingProjects
    .flatMap(({ name, company, value }) => {
      const spent = trackedHours.get(normalizeName(name));
      if (spent === undefined) return [];
      const planned = value / HOURLY_RATE;
      const progress = spent / planned;
      const status =
        progress > 1
          ? "depassement"
          : progress >= OVERRUN_WARNING
            ? "attention"
            : "ok";
      return [{ name, company, value, spent, planned, progress, status }];
    })
    .sort((a, b) => b.progress - a.progress);

  // Projets sans projet Clockify du même nom : temps passé inconnu
  const untrackedProjects = ongoingProjects
    .filter(({ name }) => !trackedHours.has(normalizeName(name)))
    .map(({ name, company, value }) => ({
      name,
      company,
      value,
      planned: value / HOURLY_RATE,
    }));

  // Travail signé restant, en heures et en mois d'objectif de CA à deux
  const remainingHours =
    projects.reduce((sum, p) => sum + Math.max(0, p.planned - p.spent), 0) +
    untrackedProjects.reduce((sum, p) => sum + p.planned, 0);
  const monthsCovered =
    (remainingHours * HOURLY_RATE) / (MONTHLY_TARGET_PER_PERSON * TEAM_SIZE);

  const monday = addDays(today, -((new Date(today).getUTCDay() + 6) % 7));
  const sumHours = (
    days: { date: string; hours: number; commercial: number }[],
    fromDate: string,
    toDate = today,
  ) =>
    days
      .filter(({ date }) => date >= fromDate && date <= toDate)
      .reduce(
        (sum, day) => ({
          hours: sum.hours + day.hours,
          commercial: sum.commercial + day.commercial,
        }),
        { hours: 0, commercial: 0 },
      );

  const people = tracked.map(({ name, days }) => {
    const last30 = sumHours(days, addDays(today, -29));
    return {
      name,
      today: sumHours(days, today).hours,
      // Dernier jour travaillé avant aujourd'hui
      lastDay: days.filter(({ date }) => date < today).at(-1) ?? null,
      week: sumHours(days, monday),
      lastWeek: sumHours(days, addDays(monday, -7), addDays(monday, -1)),
      last30: {
        ...last30,
        commercialShare: last30.hours ? last30.commercial / last30.hours : 0,
      },
      days: days.filter(({ date }) => date >= addDays(today, -13)),
    };
  });

  const recentDeals = openDeals.filter(
    ({ createdAt }) => createdAt >= addDays(today, -RECENT_DEAL_DAYS),
  );

  // Conseil : plus de commercial ou plus de production
  let level = monthsCovered < 1 ? 0 : monthsCovered < 2 ? 1 : 2;
  const reasons = [
    `${decimal.format(monthsCovered)} mois de travail signé restant (${Math.round(remainingHours)} h)`,
  ];
  if (loan.delta < 0) {
    level = Math.max(0, level - 1);
    reasons.push(
      `en retard de ${euros.format(-loan.delta)} sur la trajectoire des ${euros.format(LOAN_TARGET)}`,
    );
  }
  if (recentDeals.length < MIN_RECENT_DEALS) {
    level = Math.max(0, level - 1);
    reasons.push(
      `${recentDeals.length} deal ouvert créé ces ${RECENT_DEAL_DAYS} derniers jours`,
    );
  }
  for (const { name, last30 } of people) {
    if (last30.hours > 0 && last30.commercialShare < COMMERCIAL_SHARE_MIN) {
      reasons.push(
        `${name} : ${Math.round(last30.commercialShare * 100)} % de commercial sur 30 jours (minimum ${COMMERCIAL_SHARE_MIN * 100} %)`,
      );
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    today,
    targets: {
      hourlyRate: HOURLY_RATE,
      monthlyPerPerson: MONTHLY_TARGET_PER_PERSON,
      yearly: YEARLY_TARGET,
      dailyHours: DAILY_HOURS_TARGET,
      weeklyHours: WEEKLY_HOURS_TARGET,
      commercialShareMin: COMMERCIAL_SHARE_MIN,
      overrunWarning: OVERRUN_WARNING,
    },
    revenue: { period, average, remaining },
    loan,
    projects,
    untrackedProjects,
    workload: { remainingHours, monthsCovered },
    people,
    openDeals,
    advice: { focus: FOCUS_LEVELS[level], reasons },
  };
}
