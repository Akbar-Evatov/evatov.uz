export type SkillGroup = {
  id: string;
  title: string;
  /** lucide-react icon name, resolved in the Skills section. */
  icon: "Code" | "LayoutTemplate" | "Server" | "Database" | "Wrench" | "Sigma";
  blurb: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    icon: "Code",
    blurb: "Typed, compiled and scripted — picked per problem, not per habit.",
    items: ["Python", "TypeScript", "JavaScript", "SQL (T-SQL / PostgreSQL)", "C++", "C#/.NET"],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "LayoutTemplate",
    blurb: "Interfaces that stay fast and legible as the state grows.",
    items: ["Next.js (App Router)", "React", "Tailwind CSS", "Framer Motion", "Context API", "Responsive UI"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "Server",
    blurb: "Server-side logic where correctness and trust boundaries matter.",
    items: ["Next.js Route Handlers", "REST APIs", "Server-side validation", "Auth & access control", "Web scraping", "pandas"],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "Database",
    blurb: "Schema design first; queries that survive the data growing.",
    items: ["PostgreSQL (Neon)", "Prisma ORM", "SQL Server (SSMS)", "Window functions", "Stored procedures", "Joins & aggregation"],
  },
  {
    id: "tools",
    title: "Tools & Delivery",
    icon: "Wrench",
    blurb: "Getting work from a local branch to something people can use.",
    items: ["Git & GitHub", "Vercel", "CI deploys", "VS Code", "NASM", "Linux basics"],
  },
  {
    id: "methods",
    title: "Mathematical Problem Solving",
    icon: "Sigma",
    blurb: "The part that decides whether the software is actually right.",
    items: [
      "Probability & statistics",
      "Weight-of-evidence / logistic scorecards",
      "Algorithms & data structures",
      "Linear algebra",
      "Discrete mathematics",
      "Schema-constrained LLM output",
    ],
  },
];
