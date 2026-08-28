export type ProjectLink = {
  demo?: string;
  repo?: string;
};

export type ArchitectureNote = {
  label: string;
  detail: string;
};

export type ProjectVisual = {
  /** Selects which generated mockup is rendered in the card preview. */
  kind: "scorecard" | "dashboard" | "floors" | "roles";
  /** [from, to] accent stops, as raw CSS colors. */
  accent: [string, string];
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  period: string;
  role: string;
  tagline: string;
  problem: string;
  architecture: ArchitectureNote[];
  tech: string[];
  accolade?: string;
  links: ProjectLink;
  visual: ProjectVisual;
};

export const projects: Project[] = [
  {
    slug: "shadow-index",
    title: "Shadow Index",
    period: "August 2026",
    role: "Methodology & research",
    tagline:
      "Scores how likely a business is operating in the shadow economy — and explains every flag it raises.",
    problem:
      "The shadow economy is, by definition, unmeasured: there is no ground-truth label to train on. The task was to turn an officially unmeasurable problem into a defensible score a regulator would actually act on.",
    architecture: [
      {
        label: "Weight-of-evidence scorecard",
        detail:
          "A logistic scorecard — the family used in credit-risk underwriting — over seven forensic signals that cross-check a firm's own filings against each other.",
      },
      {
        label: "Confidence separated from probability",
        detail:
          "Evidential strength is computed on its own axis, so a marginal case never reads as a certain one just because the score is high.",
      },
      {
        label: "Accountable AI layer",
        detail:
          "The language model is confined to schema-constrained narrative synthesis, structurally preventing it from altering any number the deterministic layers produce.",
      },
    ],
    tech: [
      "Python",
      "Logistic scorecards",
      "Weight of Evidence",
      "Statistical modelling",
      "Schema-constrained LLM",
    ],
    accolade: "2nd Place — National AI Hackathon · 20,000,000 UZS",
    links: { demo: "https://shadow.claive.uz" },
    visual: {
      kind: "scorecard",
      accent: ["#22d3ee", "#6366f1"],
      caption: "risk_score.py",
    },
  },
  {
    slug: "math-testing-platform",
    title: "Math Homework & Testing Platform",
    period: "2026",
    role: "Full-stack — design, build, deploy",
    tagline:
      "A live auto-graded testing platform built for a maths teacher, with no student accounts to manage.",
    problem:
      "A teacher needed to assign and grade multiple-choice tests for classes of students who have no email addresses and would never remember a password. Anything with a signup flow was dead on arrival.",
    architecture: [
      {
        label: "Passwordless by student ID",
        detail:
          "Teachers create classes and tests and assign them by shareable link; students enter with a student ID — no account, no password, no reset flow.",
      },
      {
        label: "Server-side grading",
        detail:
          "Answer keys never reach the browser. Submissions are graded on the server, so the correct answers cannot be read out of the client payload.",
      },
      {
        label: "One attempt, enforced",
        detail:
          "Attempts are constrained per student ID at the data layer, with a teacher dashboard reporting score per student and accuracy per question.",
      },
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Vercel"],
    links: { repo: "https://github.com/akbarevatov" },
    visual: {
      kind: "dashboard",
      accent: ["#34d399", "#22d3ee"],
      caption: "results.tsx",
    },
  },
  {
    slug: "game-reservation",
    title: "Game Reservation SPA",
    period: "2025",
    role: "State architecture & implementation",
    tagline:
      "A multi-floor reservation system that stays consistent no matter which floor you are looking at.",
    problem:
      "Reservation state was spread across independent floor views, so the same slot could read as free on one screen and booked on another.",
    architecture: [
      {
        label: "Single source of truth",
        detail:
          "React Context holds structured reservation models for every floor, so each view renders from one shared state rather than its own copy.",
      },
      {
        label: "Predictable UI behaviour",
        detail:
          "Floor switching, selection and booking all run through the same reducers, keeping interaction rules identical across the app.",
      },
    ],
    tech: ["React", "Context API", "JSX", "JavaScript"],
    links: { repo: "https://github.com/akbarevatov" },
    visual: {
      kind: "floors",
      accent: ["#a78bfa", "#f472b6"],
      caption: "floors.jsx",
    },
  },
  {
    slug: "eduplatform",
    title: "EduPlatform",
    period: "2025",
    role: "Object-oriented design",
    tagline:
      "A Kundalik-style school system modelled end to end in pure Python — no backend, no database.",
    problem:
      "An exercise in whether the domain of a school information system can be expressed cleanly in objects alone, with role-based access for teachers, students, parents and admins.",
    architecture: [
      {
        label: "Role hierarchy through inheritance",
        detail:
          "A shared user abstraction specialises into teacher, student, parent and admin, each exposing only the operations its role permits.",
      },
      {
        label: "In-memory persistence",
        detail:
          "Encapsulated repositories stand in for a database, keeping the domain model free of storage concerns.",
      },
    ],
    tech: ["Python", "OOP", "Abstraction", "Polymorphism"],
    links: { repo: "https://github.com/akbarevatov" },
    visual: {
      kind: "roles",
      accent: ["#fbbf24", "#fb7185"],
      caption: "platform.py",
    },
  },
];
