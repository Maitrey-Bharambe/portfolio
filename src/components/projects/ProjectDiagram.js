import { ArrowDown } from "lucide-react";

function pad(n) {
  return String(n + 1).padStart(2, "0");
}

/** Chain of steps, drawn from `project.diagram`. Layout varies by project type. */
export default function ProjectDiagram({ diagram, projectType }) {
  if (!diagram?.steps?.length) return null;
  const { label, kind, steps } = diagram;

  if (projectType === "devtool") {
    return (
      <figure className="on-dark border-[3px] border-ink bg-ink p-4 text-ground">
        <figcaption className="mono mb-3 text-emphasis">{`// ${label}`}</figcaption>
        <ol className="mono space-y-1 !normal-case">
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

  if (kind === "set") {
    return (
      <figure>
        <figcaption className="mono mb-2">{label}</figcaption>
        <ul className="grid gap-2 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s} className="flow-step bg-emphasis">
              {s}
            </li>
          ))}
        </ul>
      </figure>
    );
  }

  return (
    <figure>
      <figcaption className="mono mb-2">{label}</figcaption>
      <ol>
        {steps.map((s, i) => (
          <li key={s}>
            {i > 0 && (
              <span className="flex h-6 justify-center" aria-hidden>
                <ArrowDown size={22} strokeWidth={3.5} />
              </span>
            )}
            <div className="flow-step">
              <span className="mono mr-2 text-[length:var(--dp-typography-label)]">{pad(i)}</span>
              {s}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
