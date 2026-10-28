import SectionHeading from "@/components/ui/SectionHeading";
import PrinciplesGraph from "./PrinciplesGraph";

const mark = "bg-emphasis px-1.5 box-decoration-clone";

export default function Philosophy() {
  return (
    <section id="about" aria-labelledby="about-title" className="sec-pad border-y-4 border-ink bg-field">
      <div className="wrap">
        <SectionHeading id="about-title" eyebrow="04 / Working principles" title="More than a model." />
        <p className="-mt-4 mb-12 max-w-[46ch] text-xl font-extrabold leading-snug md:-mt-6 md:mb-16 md:text-2xl">
          I turn data into decisions by combining <span className={mark}>data science</span>, <span className={mark}>AI</span>, domain
          knowledge, and thoughtful engineering.
        </p>
        <PrinciplesGraph />
      </div>
    </section>
  );
}
