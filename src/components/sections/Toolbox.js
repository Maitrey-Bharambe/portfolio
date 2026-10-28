import { skills } from "@/data/skills";
import SectionHeading from "@/components/ui/SectionHeading";

const accent = { yellow: "bg-emphasis", violet: "bg-field" };

export default function Toolbox() {
  return (
    <section id="toolbox" aria-labelledby="toolbox-title" className="sec-pad border-t-4 border-ink">
      <div className="wrap">
        <SectionHeading id="toolbox-title" eyebrow="03 / Toolbox" title="Tools of the trade." />
        {/* Cells sit on an ink background with a 4px gap, which draws every internal rule. */}
        <div className="grid gap-1 border-4 border-ink bg-ink md:grid-cols-2 xl:grid-cols-4">
          {skills.map((group) => (
            <div key={group.title} className="bg-contrast">
              <h3 className={`${accent[group.accent]} border-b-4 border-ink px-4 py-3 text-lg font-black uppercase tracking-tight`}>
                {group.title}
              </h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item} className="border-b-2 border-ink px-4 py-2 text-[length:var(--dp-typography-reading)] last:border-b-0">
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
