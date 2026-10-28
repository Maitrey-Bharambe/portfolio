import { identity } from "@/data/profile";

export default function IdentityStrip() {
  return (
    <section aria-label="Technical identity" className="border-y-4 border-ink bg-contrast">
      <div className="wrap">
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
          {identity.map((item, i) => (
            <li
              key={item.n}
              className={`py-6 sm:px-6 sm:py-8 ${i > 0 ? "border-t-[3px] border-ink sm:border-t-0" : ""} ${
                i % 2 === 1 ? "sm:border-l-[3px] sm:border-ink" : ""
              } ${i >= 2 ? "sm:border-t-[3px] lg:border-t-0" : ""} ${i > 0 ? "lg:border-l-[3px] lg:border-ink" : ""} ${
                i === 0 ? "lg:pl-0" : ""
              } ${i === 3 ? "lg:pr-0" : ""}`}
            >
              <p className="mono mb-3">
                {item.n} / {item.title}
              </p>
              <p className="text-[length:var(--dp-typography-reading)] leading-snug">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
