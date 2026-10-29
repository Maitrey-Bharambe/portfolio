import { Database, BrainCircuit, Network, Code2 } from "lucide-react";
import { identity } from "@/data/profile";

const icons = [Database, BrainCircuit, Network, Code2];
// Colour, tilt and tape per card so the row feels like stickers on a board.
const looks = [
  { bg: "bg-emphasis", tilt: "-1.2deg", tape: "left-5 -rotate-3 bg-signal" },
  { bg: "bg-field", tilt: "0.9deg", tape: "right-5 rotate-3 bg-emphasis" },
  { bg: "bg-signal", tilt: "-0.8deg", tape: "left-5 rotate-2 bg-field" },
  { bg: "bg-contrast", tilt: "1.2deg", tape: "right-5 -rotate-2 bg-emphasis" },
];

export default function IdentityStrip() {
  return (
    <section aria-label="Technical identity" className="border-y-4 border-ink bg-ground py-10 md:py-14">
      <div className="wrap">
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {identity.map((item, i) => {
            const look = looks[i % looks.length];
            const Icon = icons[i % icons.length];
            return (
              <li
                key={item.n}
                className={`card relative ${look.bg} p-5`}
                style={{ "--tilt": look.tilt }}
              >
                <span aria-hidden="true" className={`absolute -top-3 h-5 w-16 border-2 border-ink ${look.tape}`} />
                <div className="flex items-start justify-between gap-3">
                  <span className="num-outline display text-6xl leading-[0.8]" aria-hidden="true">{item.n}</span>
                  <span className="grid h-11 w-11 place-items-center border-[3px] border-ink bg-ground" style={{ boxShadow: "3px 3px 0 var(--dp-color-ink)" }}>
                    <Icon size={22} strokeWidth={2.75} aria-hidden />
                  </span>
                </div>
                <h3 className="mono mt-5 inline-block bg-ink px-2 py-1 text-emphasis">{item.title}</h3>
                <p className="mt-3 text-[length:var(--dp-typography-reading)] font-semibold leading-snug">{item.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
