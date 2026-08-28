/**
 * The three tracks that make up the non-traditional background, and the
 * engineering traits they add up to. Edit the pillars here to re-cut the
 * Journey section — the layout adapts to two or three entries.
 */
export type JourneyPillar = {
  id: string;
  kicker: string;
  title: string;
  period: string;
  icon: "Sigma" | "Trophy" | "Terminal";
  body: string;
  highlights: string[];
};

export const journeyPillars: JourneyPillar[] = [
  {
    id: "mathematics",
    kicker: "Foundation",
    title: "Mathematics, taken seriously",
    period: "2021 — present",
    icon: "Sigma",
    body:
      "Cambridge A Level Mathematics and Physics at an A, then linear algebra, discrete mathematics, calculus and probability & statistics as a Software Engineering undergraduate. It is the reason I reach for a model before I reach for a heuristic.",
    highlights: ["A Level Maths 83/100 (A)", "A Level Physics 83/100 (A)", "Probability & Statistics"],
  },
  {
    id: "operations",
    kicker: "Applied",
    title: "Problems with real stakeholders",
    period: "2025 — 2026",
    icon: "Trophy",
    body:
      "A three-day national hackathon with a jury to convince, and a testing platform built for one working maths teacher and her actual classes. Both taught the same lesson: the constraint is rarely the code, it is what the people using it can realistically do.",
    highlights: ["2nd place, National AI Hackathon", "20,000,000 UZS awarded", "Shipped to real classrooms"],
  },
  {
    id: "engineering",
    kicker: "Craft",
    title: "Full-stack engineering",
    period: "2024 — present",
    icon: "Terminal",
    body:
      "Next.js and Python end to end — schema design in Prisma and PostgreSQL, server-side logic where trust matters, and deployment on Vercel. Plus a Python and SQL Server programme at MAAB Innovation covering pandas, APIs and window functions.",
    highlights: ["Next.js · Prisma · PostgreSQL", "MAAB Python & SQL programme", "Deployed, not just demoed"],
  },
];

export type Strength = {
  title: string;
  detail: string;
  icon: "Brain" | "MessageSquare" | "Package";
};

export const strengths: Strength[] = [
  {
    title: "Analytical depth",
    detail:
      "I can tell the difference between a number that means something and a number that merely exists — and I build the second kind out of the system.",
    icon: "Brain",
  },
  {
    title: "Clear communication",
    detail:
      "Explaining a scorecard to a jury and a test result to a teacher use the same skill: say the honest thing in the listener's vocabulary.",
    icon: "MessageSquare",
  },
  {
    title: "Product-minded engineering",
    detail:
      "Passwordless logins, one-attempt rules, server-side grading — the design decisions I am proudest of are the ones that came from watching how people actually behave.",
    icon: "Package",
  },
];
