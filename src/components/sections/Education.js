import { education } from "@/data/education";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Education() {
  return (
    <section id="education" aria-labelledby="edu-title" className="sec-pad">
      <div className="wrap">
        <SectionHeading id="edu-title" eyebrow="05 / Education" title="Where I study." />
        <ul className="border-4 border-ink bg-contrast">
          {education.map((e) => (
            <li
              key={e.id}
              className={`grid gap-1 border-b-4 border-ink px-4 py-5 last:border-b-0 md:grid-cols-[1fr_auto] md:items-center md:gap-8 md:px-6 ${
                e.highlight ? "bg-emphasis" : ""
              }`}
            >
              <div>
                <h3 className="text-xl font-black uppercase leading-tight tracking-tight md:text-2xl">{e.degree}</h3>
                <p className="text-[length:var(--dp-typography-reading)]">{e.institution}</p>
              </div>
              <p className="mono md:text-right">
                {e.years && <span className="block">{e.years}</span>}
                <span className="block">{e.score}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
