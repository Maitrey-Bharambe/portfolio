import { experience } from "@/data/experience";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ExperienceLedger() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="sec-pad border-t-4 border-ink bg-contrast">
      <div className="wrap">
        <SectionHeading id="exp-title" eyebrow="02 / Experience" title="Where I've built things." />
        <ol className="border-4 border-ink bg-ground">
          {experience.map((e) => (
            <li
              key={e.id}
              className={`grid gap-3 border-b-4 border-ink px-4 py-6 last:border-b-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-10 md:px-6 ${
                e.highlight ? "bg-emphasis" : ""
              }`}
            >
              <div>
                {e.dates && <p className="mono mb-2">{e.dates}</p>}
                <h3 className="text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">{e.role}</h3>
                <p className="mt-2 text-[length:var(--dp-typography-reading)] font-extrabold">{e.organization}</p>
              </div>
              {(e.points?.length > 0 || e.tags?.length > 0) && (
                <div>
                  {e.points?.length > 0 && (
                    <ul className="space-y-1 text-[length:var(--dp-typography-reading)]">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span aria-hidden className="font-black">/</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {e.tags?.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies and areas">
                      {e.tags.map((t) => (
                        <li key={t} className="chip">{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {e.pipeline && (
                <figure className="border-t-[3px] border-ink pt-4 md:col-span-2">
                  <figcaption className="mono mb-3">{e.pipeline.label}</figcaption>
                  <ol className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-center">
                    {e.pipeline.steps.map((step, i) => (
                      <li key={step} className="flex items-center gap-2">
                        {i > 0 && <ArrowRight size={18} strokeWidth={3.5} aria-hidden className="hidden lg:block" />}
                        <span className="flow-step bg-field">
                          <span className="mono mr-2">{String(i + 1).padStart(2, "0")}</span>
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </figure>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
