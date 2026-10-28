import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import ProjectDiagram from "./ProjectDiagram";
import { cx } from "@/lib/utils";

// Header band colour and diagram panel colour per project type.
const theme = {
  pipeline: { head: "bg-field", panel: "bg-field" },
  classifier: { head: "bg-ground", panel: "bg-ground" },
  vision: { head: "bg-emphasis", panel: "bg-ground" },
  devtool: { head: "bg-ink text-emphasis", panel: "bg-contrast" },
  rl: { head: "stripe-racing", panel: "bg-ground" },
  software: { head: "bg-ground", panel: "bg-ground" },
};

function Detail({ label, children }) {
  return (
    <div>
      <dt className="mono mb-1">{label}</dt>
      <dd className="text-[length:var(--dp-typography-reading)] leading-snug">{children}</dd>
    </div>
  );
}

function PendingCard({ project, tilt }) {
  return (
    <article
      id={project.id}
      className="card on-dark-none scroll-mt-20 bg-field p-6 sm:p-8 lg:col-span-2"
      style={{ "--tilt": tilt }}
      aria-labelledby={`${project.id}-title`}
    >
      <div className="mono mb-4 flex flex-wrap items-center gap-3">
        <span>{project.code}</span>
        <span className="border-2 border-ink bg-ink px-2 py-0.5 text-emphasis">{project.category}</span>
      </div>
      <h3 id={`${project.id}-title`} className="display text-[clamp(2.6rem,10vw,7.5rem)]">
        {project.name}
      </h3>
      <p className="mt-5 max-w-[52ch] border-l-4 border-ink pl-4 text-[length:var(--dp-typography-reading)]">
        {project.pendingNote}
      </p>
      <Links project={project} />
    </article>
  );
}

function Links({ project }) {
  if (!project.githubUrl && !project.liveUrl) return null;
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {project.githubUrl && (
        <Button href={project.githubUrl} external small variant="ink">
          GitHub <ArrowUpRight size={16} strokeWidth={3} aria-hidden />
        </Button>
      )}
      {project.liveUrl && (
        <Button href={project.liveUrl} external small variant="yellow">
          Live demo <ArrowUpRight size={16} strokeWidth={3} aria-hidden />
        </Button>
      )}
    </div>
  );
}

export default function ProjectCard({ project, index }) {
  const tilt = project.featured ? "0deg" : index % 2 === 0 ? "-0.4deg" : "0.4deg";
  if (project.projectType === "pending") return <PendingCard project={project} tilt={tilt} />;

  const t = theme[project.projectType] ?? theme.software;
  const hasDiagram = project.diagram?.steps?.length > 0;
  const { image, architecture } = project;
  const spans = project.featured || project.wide;

  return (
    <article
      id={project.id}
      className={cx("card flex flex-col scroll-mt-20", spans && "lg:col-span-2")}
      style={{ "--tilt": tilt }}
      aria-labelledby={`${project.id}-title`}
    >
      <div className={cx("mono flex flex-wrap items-center justify-between gap-2 border-b-4 border-ink px-4 py-2", t.head)}>
        <span className={project.projectType === "rl" ? "bg-emphasis px-2 py-0.5 text-ink" : ""}>
          {project.code} / {project.category}
        </span>
        {project.achievement && (
          <span className="border-2 border-ink bg-signal px-2 py-0.5 font-black text-ink lg:-rotate-2">
            {project.achievement}
          </span>
        )}
      </div>

      <div className={cx("grid flex-1", spans && "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]")}>
        <div className="p-5 sm:p-6">
          <h3 id={`${project.id}-title`} className={cx("display", project.featured ? "text-[clamp(2.2rem,5.5vw,4.4rem)]" : "text-[clamp(1.9rem,3.6vw,3rem)]")}>
            {project.name}
          </h3>
          {project.shortDescription && (
            <p className="mt-4 text-[length:var(--dp-typography-body)] leading-snug">{project.shortDescription}</p>
          )}

          <dl className="mt-5 space-y-4 border-t-[3px] border-ink pt-5">
            {project.problem && <Detail label="Problem">{project.problem}</Detail>}
            {project.implementation?.length > 0 && (
              <Detail label="Implementation">
                <ul className="space-y-1">
                  {project.implementation.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span aria-hidden className="font-black">/</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </Detail>
            )}
            {project.contribution && <Detail label="My contribution">{project.contribution}</Detail>}
            {project.results?.length > 0 && (
              <Detail label="Results">
                <ul className="space-y-1">
                  {project.results.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </Detail>
            )}
          </dl>

          {project.technologies?.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
              {project.technologies.map((tech) => (
                <li key={tech} className="chip">{tech}</li>
              ))}
            </ul>
          )}
          <Links project={project} />
        </div>

        {(hasDiagram || image || architecture) && (
          <div className={cx("space-y-4 border-t-4 border-ink p-5 sm:p-6", spans && "lg:border-l-4 lg:border-t-0", t.panel)}>
            {image && (
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full border-[3px] border-ink"
              />
            )}
            {architecture && (
              <figure>
                <figcaption className="mono mb-2">Architecture</figcaption>
                <Image
                  src={architecture.src}
                  alt={architecture.alt}
                  width={architecture.width}
                  height={architecture.height}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="h-auto w-full border-[3px] border-ink"
                />
              </figure>
            )}
            {hasDiagram && <ProjectDiagram diagram={project.diagram} projectType={project.projectType} />}
          </div>
        )}
      </div>
    </article>
  );
}
