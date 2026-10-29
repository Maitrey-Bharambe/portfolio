import Image from "next/image";
import { ArrowRight } from "lucide-react";
import CertificateViewer from "./CertificateViewer";
import { experience } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";

function CompanyMark({ entry }) {
  if (!entry.logo && !entry.mark) return null;
  return (
    <div
      className={`grid h-16 w-24 shrink-0 place-items-center border-[3px] border-ink p-2 md:h-20 md:w-32 ${entry.logo?.dark ? "bg-ink" : "bg-contrast"}`}
      style={{ boxShadow: "3px 3px 0 var(--dp-color-ink)" }}
    >
      {entry.logo ? (
        <span className="relative block h-full w-full">
          <Image src={entry.logo.src} alt={entry.logo.alt} fill sizes="128px" className="object-contain" />
        </span>
      ) : (
        <span aria-hidden="true" className="display text-xl md:text-2xl">{entry.mark}</span>
      )}
    </div>
  );
}

export default function ExperienceLedger() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="sec-pad border-t-4 border-ink bg-contrast">
      <div className="wrap">
        <SectionHeading id="exp-title" eyebrow="02 / Experience" title="Where I've built things." />

        <ol className="space-y-8 md:space-y-10">
          {experience.map((e, i) => (
            <li
              key={e.id}
              className="relative grid border-4 border-ink bg-ground md:grid-cols-[13rem_minmax(0,1fr)]"
              style={{ boxShadow: "var(--shadow) var(--shadow) 0 var(--dp-color-ink)" }}
            >
              {/* Date column: the same yellow on every row */}
              <div className="flex items-center justify-between gap-3 border-b-4 border-ink bg-emphasis p-4 md:flex-col md:items-start md:justify-between md:border-b-0 md:border-r-4 md:p-5">
                <span className="num-outline display text-5xl leading-[0.8] md:text-6xl" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col items-end gap-2 md:items-start">
                  {e.dates && <p className="mono">{e.dates}</p>}
                  {e.ongoing && (
                    <span className="mono -rotate-2 border-[3px] border-ink bg-signal px-2 py-0.5 font-black">● Ongoing</span>
                  )}
                </div>
              </div>

              <div className="p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <CompanyMark entry={e} />
                    <div>
                    <h3 className="text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">{e.role}</h3>
                    <p className="mt-2 text-[length:var(--dp-typography-body)] font-extrabold">{e.organization}</p>
                    </div>
                  </div>
                  {e.certificate && <CertificateViewer certificate={e.certificate} label={e.organization.split(",")[0].replace(/^The /, "")} />}
                </div>

                {e.points?.length > 0 && (
                  <ul className="mt-4 space-y-1.5 text-[length:var(--dp-typography-reading)] leading-snug">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span aria-hidden className="font-black">/</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {e.tags?.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies and areas">
                    {e.tags.map((t) => (
                      <li key={t} className="chip">{t}</li>
                    ))}
                  </ul>
                )}

                {e.pipeline && (
                  <figure className="mt-5 border-[3px] border-ink bg-field p-3">
                    <figcaption className="mono mb-2">{e.pipeline.label}</figcaption>
                    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
                      {e.pipeline.steps.map((step, n) => (
                        <li key={step} className="flex items-center gap-1.5">
                          {n > 0 && <ArrowRight size={16} strokeWidth={3.5} aria-hidden className="shrink-0" />}
                          <span className="flow-step !px-2 !py-1 !text-[13px]">
                            <span className="mono mr-1.5 !text-[11px]">{String(n + 1).padStart(2, "0")}</span>
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </figure>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
