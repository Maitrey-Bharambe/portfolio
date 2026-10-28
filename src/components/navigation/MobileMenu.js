"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function MobileMenu({ items }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="btn btn-yellow btn-sm"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={18} strokeWidth={3} aria-hidden /> : <Menu size={18} strokeWidth={3} aria-hidden />}
        <span>{open ? "Close" : "Menu"}</span>
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="absolute inset-x-0 top-full border-b-4 border-ink bg-ground"
        >
          <ul>
            {items.map((item) => (
              <li key={item.href} className="border-t-[3px] border-ink first:border-t-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-4 text-lg font-black uppercase hover:bg-emphasis"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
