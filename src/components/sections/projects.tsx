import { ArrowUpRight, Trophy } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { projects, type Project } from "@/data/projects";
import { ProjectPreview } from "@/components/ui/project-preview";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechBadge } from "@/components/ui/tech-badge";
import { cn } from "@/lib/utils";

function ProjectLinks({ project }: { project: Project }) {
  const { demo, repo } = project.links;
  if (!demo && !repo) return null;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-4">
      {demo ? (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
        >
          Live demo
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      ) : null}
      {repo ? (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
        >
          <GithubIcon className="h-3.5 w-3.5" />
          Source
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      ) : null}
    </div>
  );
}

function Architecture({ project }: { project: Project }) {
  return (
    <div className="mt-5">
      <p className="font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
        How it is built
      </p>
      <ul className="mt-3 space-y-3">
        {project.architecture.map((note) => (
          <li key={note.label} className="flex gap-3">
            <span
              aria-hidden
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            />
            <p className="text-sm leading-relaxed text-fg-muted">
              <span className="font-medium text-fg">{note.label}</span>
              <span className="text-fg-subtle"> &mdash; </span>
              {note.detail}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-wide text-fg-subtle uppercase">
      <span>{project.period}</span>
      <span aria-hidden className="h-1 w-1 rounded-full bg-border-strong" />
      <span>{project.role}</span>
    </div>
  );
}

function ProjectCard({
  project,
  wide,
  delay = 0,
}: {
  project: Project;
  wide?: boolean;
  delay?: number;
}) {
  return (
    <Reveal
      as="li"
      delay={delay}
      className={cn(
        "hairline group relative rounded-xl border border-border bg-surface/70 p-5 backdrop-blur",
        "shadow-card transition-colors duration-300 hover:border-border-strong sm:p-6",
        wide && "lg:col-span-2",
      )}
    >
      <div
        className={cn(
          wide && "grid items-start gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10",
        )}
      >
        <div className={cn(wide && "lg:order-2")}>
          <ProjectPreview
            visual={project.visual}
            slug={project.slug}
            className="transition-transform duration-500 group-hover:-translate-y-0.5"
          />
        </div>

        <div className={cn("mt-5", wide && "mt-0 lg:order-1")}>
          <ProjectMeta project={project} />

          <h3 className="mt-2.5 text-xl font-semibold tracking-tight sm:text-2xl">
            {project.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-fg-muted text-pretty sm:text-base">
            {project.tagline}
          </p>

          {project.accolade ? (
            <p className="mt-4 inline-flex items-start gap-2 rounded-lg border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-xs leading-relaxed font-medium text-amber-500 dark:text-amber-300">
              <Trophy className="mt-px h-3.5 w-3.5 shrink-0" />
              {project.accolade}
            </p>
          ) : null}

          <div className="mt-5 rounded-lg border border-border bg-bg-elevated/60 p-4">
            <p className="font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
              The problem
            </p>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted text-pretty">
              {project.problem}
            </p>
          </div>

          <Architecture project={project} />

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li key={tech}>
                <TechBadge>{tech}</TechBadge>
              </li>
            ))}
          </ul>

          <ProjectLinks project={project} />
        </div>
      </div>
    </Reveal>
  );
}

export function Projects() {
  const [featured, second, ...rest] = projects;

  return (
    <section id="projects" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title="Projects, with the reasoning left in"
          description="Four builds where the interesting part was not the framework. Each one lists the problem it solves, the decisions that made it work, and where to read the code."
        />

        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          <ProjectCard project={featured} wide />
          <ProjectCard project={second} wide delay={0.05} />
          {rest.map((project, i) => (
            <ProjectCard key={project.slug} project={project} delay={0.05 * (i + 1)} />
          ))}
        </ul>
      </div>
    </section>
  );
}
