import { philosophy } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Philosophy() {
  return (
    <section id="about" aria-labelledby="about-title" className="sec-pad border-y-4 border-ink bg-field">
      <div className="wrap">
        <SectionHeading id="about-title" eyebrow="04 / Working principles" title="More than a model." />
        <ol className="grid border-t-[3px] border-ink md:grid-cols-2 md:gap-x-16">
          {philosophy.map((p) => (
            <li key={p.n} className="border-b-[3px] border-ink py-6 md:py-8">
              <p className="mono mb-2">
                {p.n} / {p.title}
              </p>
              <p className="max-w-[34ch] text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
