"use client";

import { useEffect, useRef, useState } from "react";
import Lanyard from "./Lanyard";
import { getLanyardArt, supportsWebGL } from "@/lib/lanyardArt";
import { profile } from "@/data/profile";
import { LANDED_EVENT } from "./HeroLanyard";

const SHOW_MS = 3200; // how long the card swings before it flies to the hero
const FLY_MS = 1150;

// Full-screen loading intro: the ID card drops in on its lanyard, a progress bar fills,
// then the card flies into the red panel of the hero and the page takes over.
export default function IntroLanyard() {
  const [phase, setPhase] = useState("loading"); // loading | landing | leaving | done
  const [art, setArt] = useState(null);
  const [progress, setProgress] = useState(0.05);
  const [box, setBox] = useState(null); // { w, h, intro: "transform", land: "transform" }
  const startRef = useRef(0);
  const artAt = useRef(0);
  const finished = useRef(false);

  const finish = (webgl = true) => {
    if (finished.current) return;
    finished.current = true;
    document.documentElement.style.overflow = "";
    window.__lanyardLanded = webgl;
    window.dispatchEvent(new Event(LANDED_EVENT));
  };

  // Decide whether to play, lock scroll, load artwork.
  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !supportsWebGL()) {
      setPhase("done");
      finish(false);
      return undefined;
    }
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    startRef.current = performance.now();
    let alive = true;
    getLanyardArt(profile).then((a) => {
      if (!alive) return;
      const slot = document.getElementById("hero-lanyard-slot");
      if (!a || !slot) {
        setPhase("done");
        finish(false);
        return;
      }
      const r = slot.getBoundingClientRect();
      const pw = slot.clientWidth;
      const ph = slot.clientHeight;
      const F = 1.36; // the hero canvas is 36% larger than the panel so the card fills it
      const w = pw * F;
      const h = ph * F;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const k = Math.max(1, Math.min((vh * 0.94) / h, 2.2));
      const bw = w * 2.4; // wider canvas so the card can swing without being clipped
      setBox({
        w: bw,
        h,
        intro: `translate(${(vw * 0.5 - (bw * k) / 2).toFixed(1)}px, 0px) scale(${k.toFixed(3)})`,
        land: `translate(${(r.left + slot.clientLeft - (w - pw) / 2 - (bw - w) / 2).toFixed(1)}px, ${(r.top + slot.clientTop - 0.153 * ph).toFixed(1)}px) scale(1)`,
      });
      artAt.current = performance.now();
      setArt(a);
    });
    return () => {
      alive = false;
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Progress bar + move on once the card has had its moment.
  useEffect(() => {
    if (phase !== "loading") return undefined;
    let raf = 0;
    const tick = (now) => {
      const p = art ? 0.18 + 0.82 * Math.min(1, (now - artAt.current) / SHOW_MS) : Math.min(0.15, (now - startRef.current) / 4000);
      setProgress(p);
      if (art && p >= 1) {
        setTimeout(() => setPhase("landing"), 250);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, art]);

  // After the card has flown into place, hand over to the hero's own lanyard.
  useEffect(() => {
    if (phase !== "landing") return undefined;
    const t1 = setTimeout(() => {
      finish(true);
      setPhase("leaving");
    }, FLY_MS + 60);
    const t2 = setTimeout(() => setPhase("done"), FLY_MS + 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase]);

  const skip = () => {
    finish(true);
    setPhase("done");
  };

  if (phase === "done") return null;

  const flying = phase === "landing" || phase === "leaving";

  return (
    <div className="intro-cover fixed inset-0 z-[200]" aria-hidden={flying ? "true" : undefined} role="presentation">
      <noscript>
        <style>{`.intro-cover{display:none!important}`}</style>
      </noscript>

      {/* yellow backdrop fades out while the card flies */}
      <div
        className="absolute inset-0 bg-emphasis"
        style={{ opacity: flying ? 0 : 1, transition: "opacity 0.8s ease 0.1s" }}
      >
        {[
          { side: "left-[6vw]", rot: "-rotate-6" },
          { side: "right-[6vw]", rot: "rotate-6" },
        ].map(({ side, rot }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={side}
            src="/images/logo.png"
            alt=""
            className={`absolute top-1/2 hidden aspect-square w-[min(20vw,30vh)] -translate-y-1/2 border-[5px] border-ink md:block ${side} ${rot}`}
            style={{ boxShadow: "8px 8px 0 var(--dp-color-ink)" }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-3 stripe-racing" />
      </div>

      {/* the card on its lanyard */}
      {art && box && (
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: box.w,
            height: box.h,
            transform: flying ? box.land : box.intro,
            transition:
              phase === "landing"
                ? `transform ${FLY_MS}ms cubic-bezier(0.65, 0, 0.2, 1)`
                : phase === "leaving"
                  ? "opacity 0.3s ease"
                  : "none",
            opacity: phase === "leaving" ? 0 : 1,
            willChange: "transform",
          }}
        >
          <Lanyard
            frontImage={art.front}
            backImage={art.back}
            strapImage={art.strap}
            strapColor="#000000"
            cardColor="#fff5d6"
            size={0.72}
            strapLength={0}
            intro
            damping={0.85}
            breeze={0.2}
            cornerRadius={0.25}
          />
        </div>
      )}

      {/* loading bar */}
      <div
        className="absolute bottom-8 left-1/2 w-[min(86vw,420px)] -translate-x-1/2"
        style={{ opacity: flying ? 0 : 1, transition: "opacity 0.3s ease" }}
      >
        <div className="mono mb-2 flex items-center justify-between">
          <span className="bg-ink px-2 py-1 text-emphasis">Loading portfolio</span>
          <span className="font-black">{Math.round(progress * 100)}%</span>
        </div>
        <div className="h-6 border-4 border-ink bg-contrast" style={{ boxShadow: "4px 4px 0 var(--dp-color-ink)" }}>
          <div className="h-full bg-signal" style={{ width: `${progress * 100}%`, transition: "width 0.1s linear" }} />
        </div>
      </div>

      <button
        type="button"
        onClick={skip}
        className="mono absolute right-4 top-4 border-[3px] border-ink bg-contrast px-3 py-1.5 font-black hover:bg-field"
        style={{ boxShadow: "3px 3px 0 var(--dp-color-ink)", opacity: flying ? 0 : 1 }}
      >
        Skip intro →
      </button>
    </div>
  );
}
