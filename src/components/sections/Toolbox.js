import { skills } from "@/data/skills";
import SectionHeading from "@/components/ui/SectionHeading";

const accent = { yellow: "bg-emphasis", violet: "bg-field" };

// One ruled row per category. Skills wrap as tags, so every row is only as tall
// as its content and no column is left looking empty.
export default function Toolbox() {
  return (
    <section id="toolbox" aria-labelledby="toolbox-title" className="sec-pad border-t-4 border-ink">
      <div className="wrap">
        <SectionHeading id="toolbox-title" eyebrow="03 / Toolbox" title="Tools of the trade." />
        <div className="border-4 border-ink bg-contrast">
          {skills.map((group, i) => (
            <div
              key={group.title}
              className="grid border-ink not-first:border-t-4 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]"
            >
              <h3
                className={`${accent[group.accent]} flex items-center gap-3 border-b-4 border-ink px-4 py-4 text-lg font-black uppercase tracking-tight md:border-b-0 md:border-r-4 md:text-xl`}
              >
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                {group.title}
              </h3>
              <ul className="flex flex-wrap content-center gap-2 p-4 md:p-5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-[3px] border-ink bg-ground px-3 py-1.5 text-[length:var(--dp-typography-reading)] font-extrabold leading-tight"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
