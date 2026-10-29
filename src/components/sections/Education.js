import { GraduationCap, School, MapPin } from "lucide-react";
import { education } from "@/data/education";
import SectionHeading from "@/components/ui/SectionHeading";

// Per-card look: main degree is the big yellow card, the other one is violet.
const looks = [
  { bg: "bg-emphasis", tilt: "-0.7deg", tape: "left-6 -rotate-3 bg-signal", icon: GraduationCap },
  { bg: "bg-field", tilt: "0.9deg", tape: "right-6 rotate-3 bg-emphasis", icon: School },
];

export default function Education() {
  return (
    <section id="education" aria-labelledby="edu-title" className="sec-pad">
      <div className="wrap">
        <SectionHeading id="edu-title" eyebrow="05 / Education" title="Where I study." />
        <ul className="grid gap-10 md:grid-cols-[1.35fr_1fr] md:items-stretch md:gap-12">
          {education.map((e, i) => {
            const look = looks[i % looks.length];
            const Icon = look.icon;
            return (
              <li key={e.id} className={`card relative flex flex-col ${look.bg}`} style={{ "--tilt": look.tilt }}>
                <span aria-hidden="true" className={`absolute -top-3 z-10 h-6 w-20 border-2 border-ink ${look.tape}`} />

                <div className="flex items-start justify-between gap-3 border-b-4 border-ink px-5 pb-3 pt-6">
                  <span className="num-outline display text-5xl leading-[0.8] md:text-6xl" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="grid h-12 w-12 place-items-center border-[3px] border-ink bg-ground"
                    style={{ boxShadow: "3px 3px 0 var(--dp-color-ink)" }}
                  >
                    <Icon size={24} strokeWidth={2.75} aria-hidden />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  {e.years && <p className="mono mb-3 inline-block self-start bg-ink px-2 py-1 text-emphasis">{e.years}</p>}
                  <h3 className="display text-[clamp(1.5rem,2.6vw,2.2rem)]">{e.degree}</h3>
                  <p className="mt-3 flex items-start gap-2 text-[length:var(--dp-typography-reading)] font-semibold leading-snug">
                    <MapPin size={18} strokeWidth={2.75} aria-hidden className="mt-0.5 shrink-0" />
                    {e.institution}
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="mb-2 flex items-end justify-between gap-3">
                      <p className="mono">{e.scoreLabel}</p>
                      <p className="display text-4xl leading-none md:text-5xl">
                        {e.score}
                        {e.scoreOutOf && <span className="mono ml-1 align-baseline">{e.scoreOutOf}</span>}
                      </p>
                    </div>
                    <div
                      className="h-5 border-[3px] border-ink bg-contrast"
                      role="img"
                      aria-label={`${e.scoreLabel} ${e.score} ${e.scoreOutOf}`.trim()}
                    >
                      <div className="h-full border-r-[3px] border-ink bg-signal" style={{ width: `${e.scorePercent}%` }} />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
