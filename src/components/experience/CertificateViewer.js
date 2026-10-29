"use client";

import { useRef } from "react";
import Image from "next/image";
import { BadgeCheck, X } from "lucide-react";

// Opens the certificate in an on-page viewer (no download link, no new tab).
export default function CertificateViewer({ certificate, label }) {
  const dialogRef = useRef(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="mono flex items-center gap-1.5 border-[3px] border-ink bg-field px-2 py-1 font-black transition-transform hover:-translate-y-0.5"
      >
        <BadgeCheck size={16} strokeWidth={3} aria-hidden /> View certificate
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`${label} internship certificate`}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto max-h-[92vh] w-[min(92vw,820px)] border-4 border-ink bg-ground p-0 backdrop:bg-black/70"
        style={{ boxShadow: "8px 8px 0 var(--dp-color-ink)" }}
      >
        <div className="flex items-center justify-between gap-3 border-b-4 border-ink bg-emphasis px-4 py-2">
          <p className="mono">{label} / Internship certificate</p>
          <button type="button" onClick={close} aria-label="Close certificate" className="btn btn-sm btn-light !px-2 !py-1">
            <X size={18} strokeWidth={3} aria-hidden />
          </button>
        </div>
        <div className="max-h-[calc(92vh-3.5rem)] overflow-y-auto bg-contrast p-3 sm:p-5">
          <Image
            src={certificate.src}
            alt={certificate.alt}
            width={certificate.width}
            height={certificate.height}
            sizes="(min-width: 900px) 780px, 92vw"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="h-auto w-full select-none border-[3px] border-ink"
          />
        </div>
      </dialog>
    </>
  );
}
