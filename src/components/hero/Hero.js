import { ArrowDownRight } from "lucide-react";
import { hero } from "@/data/profile";
import Button from "@/components/ui/Button";

const stripStyles = [
  "bg-ink text-emphasis",
  "bg-ground text-ink md:ml-[4%]",
  "bg-emphasis text-ink",
  "bg-ink text-ground md:ml-[9%]",
];

function ArrowTile({ className }) {
  return (
    <div
      aria-hidden="true"
      className={`grid place-items-center border-4 border-ink bg-signal text-ink ${className}`}
      style={{ boxShadow: "var(--shadow) var(--shadow) 0 var(--dp-color-ink)" }}
    >
      <ArrowDownRight size="70%" strokeWidth={3.5} />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pb-14 pt-6 md:pb-20 md:pt-10">
      <div className="wrap">
        <div
          className="relative border-4 border-ink bg-emphasis"
          style={{ boxShadow: "calc(var(--shadow) * 1.7) calc(var(--shadow) * 1.7) 0 var(--dp-color-ink)" }}
        >
          <div className="mono flex items-center justify-between gap-3 border-b-4 border-ink bg-ink px-4 py-2 text-emphasis">
            <span>{hero.meta}</span>
            <ArrowTile className="h-9 w-9 shrink-0 !shadow-none lg:hidden" />
          </div>

          <div className="relative p-4 sm:p-8 lg:p-12">
            <h1
              id="hero-title"
              className="display flex flex-col items-start text-[clamp(1.9rem,11vw,3.4rem)] sm:text-[clamp(1.9rem,9.2vw,7rem)] [&>span]:-mt-1 [&>span:first-child]:mt-0"
            >
              {hero.lines.map((line, i) => (
                <span
                  key={line}
                  className={`inline-block whitespace-nowrap border-[3px] border-ink px-[0.12em] pb-[0.05em] pt-[0.03em] sm:border-4 ${stripStyles[i % stripStyles.length]}`}
                >
                  {line}
                </span>
              ))}
            </h1>
            <ArrowTile className="absolute right-12 top-12 hidden h-32 w-32 rotate-6 lg:grid xl:h-40 xl:w-40" />

            <div className="mt-8 grid gap-8 md:mt-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
              <p className="poster bg-contrast p-5 text-[length:var(--dp-typography-body)] leading-snug lg:-rotate-1">
                {hero.intro}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:flex-col lg:items-start">
                <Button href="#work" variant="ink">
                  Explore my work
                </Button>
                <Button href="#contact" variant="light">
                  Get in touch
                </Button>
              </div>
            </div>
          </div>

          <ul
            aria-label="Technical interests"
            className="flex flex-wrap border-t-4 border-ink bg-field px-4 py-3 text-sm font-black uppercase sm:px-8 lg:px-12 [&>li:not(:last-child)::after]:mx-2 [&>li:not(:last-child)::after]:content-['/']"
          >
            {hero.interests.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
