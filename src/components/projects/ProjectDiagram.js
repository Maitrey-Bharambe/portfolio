import { ArrowRight } from "lucide-react";

function pad(n) {
  return String(n + 1).padStart(2, "0");
}

/** Compact flow of steps from `project.diagram`; wraps onto several lines when needed. */
export default function ProjectDiagram({ diagram, projectType }) {
  if (!diagram?.steps?.length) return null;
  const { label, kind, steps } = diagram;

  if (projectType === "devtool") {
    return (
      <figure className="on-dark border-[3px] border-ink bg-ink p-3 text-ground">
        <figcaption className="mono mb-2 text-emphasis">{`// ${label}`}</figcaption>
        <ol className="mono space-y-0.5 !normal-case">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-3">
              <span className="text-field" aria-hidden>{pad(i)}</span>
              <span>
                {i > 0 && <span aria-hidden className="text-emphasis">{"-> "}</span>}
                {s}
              </span>
            </li>
          ))}
        </ol>
      </figure>
    );
  }

  return (
    <figure>
      <figcaption className="mono mb-2">{label}</figcaption>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-1.5">
            {kind !== "set" && i > 0 && <ArrowRight size={16} strokeWidth={3.5} aria-hidden className="shrink-0" />}
            <span className="flow-step !px-2 !py-1 !text-[13px]">
              {kind !== "set" && <span className="mono mr-1.5 !text-[11px]">{pad(i)}</span>}
              {s}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
