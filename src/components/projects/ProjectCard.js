import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import ProjectDiagram from "./ProjectDiagram";
import { cx } from "@/lib/utils";

// Colour of the visual panel per project type.
const panelColor = {
  pipeline: "bg-field",
  classifier: "bg-signal",
  vision: "bg-emphasis",
  devtool: "bg-field",
  rl: "stripe-racing",
  software: "bg-field",
};
// Tape strip colours alternate so neighbouring cards do not match.
const tapeColor = ["bg-emphasis", "bg-signal", "bg-field", "bg-contrast"];

function Detail({ label, children }) {
  return (
    <div>
      <dt className="mono mb-1">{label}</dt>
      <dd className="text-[length:var(--dp-typography-reading)] leading-snug">{children}</dd>
    </div>
  );
}

function Links({ project }) {
  if (!project.githubUrl && !project.liveUrl) return null;
  return (
    <div className="mt-auto flex flex-wrap gap-3 pt-5">
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

function Tape({ index }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "absolute -top-3 z-10 h-6 w-20 border-2 border-ink",
        tapeColor[index % tapeColor.length],
        index % 2 === 0 ? "left-6 -rotate-3" : "right-6 rotate-3"
      )}
    />
  );
}

function Header({ project, index }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b-4 border-ink px-4 pb-3 pt-5 sm:px-5">
      <span className="num-outline display text-6xl leading-[0.8] sm:text-7xl" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex min-w-0 flex-col items-end gap-2 text-right">
        <span className="sr-only">{project.code}</span>
        <p className="mono max-w-[26ch] bg-ink px-2 py-1 text-emphasis">{project.category}</p>
        {project.achievement && (
          <span className="mono -rotate-3 border-[3px] border-ink bg-signal px-2 py-0.5 font-black text-ink">
            ★ {project.achievement}
          </span>
        )}
      </div>
    </div>
  );
}

function Media({ project, index, showcase }) {
  const { image, architecture } = project;
  const hasDiagram = project.diagram?.steps?.length > 0;
  if (!hasDiagram && !image && !architecture) return null;
  const shots = [
    image && { ...image, caption: "Screenshot" },
    architecture && { ...architecture, caption: architecture.caption ?? "Architecture" },
  ].filter(Boolean);

  return (
    <div
      className={cx(
        "flex h-full flex-col justify-center gap-6 border-b-4 border-ink p-4 sm:p-5",
        panelColor[project.projectType] ?? panelColor.software,
        showcase ? "lg:border-b-0 lg:p-6" : "min-h-[190px]",
        showcase && "lg:border-l-4"
      )}
    >
      {shots.map((shot, i) => (
        <figure key={shot.src} className={cx("relative", showcase && (i % 2 === 0 ? "lg:-rotate-1" : "lg:rotate-1"))}>
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes={showcase ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
            className="h-auto w-full border-[3px] border-ink bg-contrast"
            style={{ boxShadow: "5px 5px 0 var(--dp-color-ink)" }}
          />
          <figcaption className="mono absolute -top-3 left-3 border-2 border-ink bg-emphasis px-2 py-0.5">
            {shot.caption}
          </figcaption>
        </figure>
      ))}
      {hasDiagram && (
        <div className={cx(shots.length > 0 && "border-[3px] border-ink bg-contrast p-3")}>
          <ProjectDiagram diagram={project.diagram} projectType={project.projectType} />
        </div>
      )}
    </div>
  );
}

function Body({ project, showcase }) {
  const hasMore = project.implementation?.length > 0 || project.contribution || project.results?.length > 0;
  return (
    <div className="flex flex-1 flex-col p-4 sm:p-5">
      <h3
        id={`${project.id}-title`}
        className={cx(
          "display",
          showcase ? "text-[clamp(2.2rem,5vw,3.4rem)]" : "min-h-[1.84em] text-[clamp(1.9rem,3.4vw,2.8rem)]"
        )}
      >
        {project.name}
      </h3>
      {project.shortDescription && (
        <p className={cx("mt-3 text-[length:var(--dp-typography-reading)] leading-snug", !showcase && "line-clamp-4")}>
          {project.shortDescription}
        </p>
      )}
      {project.problem && (
        <p className="mt-4 border-l-4 border-ink pl-3 text-[length:var(--dp-typography-small)] leading-snug">
          <span className="mono mr-2 bg-emphasis px-1.5">Why</span>
          {project.problem}
        </p>
      )}

      {hasMore && (
        <details className="group/more mt-4 border-t-[3px] border-ink pt-3" open={showcase}>
          <summary className="mono flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
            <span>How it was built</span>
            <span className="grid h-6 w-6 place-items-center border-2 border-ink bg-emphasis">
              <Plus size={14} strokeWidth={3.5} aria-hidden className="transition-transform group-open/more:rotate-45" />
            </span>
          </summary>
          <dl className="mt-3 space-y-3">
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
                    <li key={r} className="flex gap-2">
                      <span aria-hidden className="font-black">→</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </Detail>
            )}
          </dl>
        </details>
      )}

      {project.technologies?.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li key={tech} className="chip">{tech}</li>
          ))}
        </ul>
      )}
      <Links project={project} />
    </div>
  );
}

export default function ProjectCard({ project, index }) {
  const showcase = Boolean(project.featured || project.wide);
  const tilt = showcase ? "0deg" : index % 2 === 0 ? "-0.6deg" : "0.6deg";

  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className={cx("card relative flex scroll-mt-20 flex-col", showcase && "lg:col-span-2")}
      style={{ "--tilt": tilt }}
    >
      <Tape index={index} />
      <Header project={project} index={index} />
      {showcase ? (
        <div className="grid flex-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <Body project={project} showcase />
          <div>
            <Media project={project} index={index} showcase />
          </div>
        </div>
      ) : (
        <>
          <Media project={project} index={index} />
          <Body project={project} />
        </>
      )}
    </article>
  );
}
