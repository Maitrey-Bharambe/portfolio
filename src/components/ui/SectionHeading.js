import { cx } from "@/lib/utils";

export default function SectionHeading({ id, eyebrow, title, sub, className }) {
  return (
    <header className={cx("mb-10 md:mb-14", className)}>
      {eyebrow && <p className="mono mb-3 inline-block border-2 border-ink bg-ink px-2 py-1 text-emphasis">{eyebrow}</p>}
      <h2 id={id} className="display h2">
        {title}
      </h2>
      {sub && <p className="mono mt-4 text-[length:var(--dp-typography-metadata)]">{sub}</p>}
    </header>
  );
}
