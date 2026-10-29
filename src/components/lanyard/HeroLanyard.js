"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Lanyard from "./Lanyard";
import { getLanyardArt, supportsWebGL } from "@/lib/lanyardArt";
import { profile } from "@/data/profile";

const portrait = {
  src: "/images/profile/maitrey.webp",
  alt: "Maitrey Bharambe in a navy blazer and white shirt, arms crossed, smiling.",
  width: 923,
  height: 1440,
};

export const LANDED_EVENT = "lanyard:landed";

// The red panel in the hero. The intro overlay flies the lanyard card into this slot,
// then this component takes over with its own live lanyard.
export default function HeroLanyard() {
  const [mode, setMode] = useState("wait"); // wait | live | static
  const [shown, setShown] = useState(false);
  const [art, setArt] = useState(null);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !supportsWebGL()) {
      setMode("static");
      return undefined;
    }
    getLanyardArt(profile).then((a) => {
      if (!a) {
        setMode("static");
        return;
      }
      setArt(a);
      setMode("live"); // mounts hidden so its textures are ready when the intro card lands
      if (window.__lanyardLanded) setShown(true);
    });
    const onLanded = () => setShown(true);
    window.addEventListener(LANDED_EVENT, onLanded);
    return () => window.removeEventListener(LANDED_EVENT, onLanded);
  }, []);

  return (
    <div
      id="hero-lanyard-slot"
      className="relative mx-auto mt-6 h-[360px] w-64 overflow-hidden border-4 border-ink bg-signal sm:h-[405px] sm:w-72 lg:absolute lg:bottom-0 lg:right-8 lg:mx-0 lg:mt-0 lg:h-[338px] lg:w-[240px] lg:border-b-0 xl:right-10 xl:h-[422px] xl:w-[300px]"
      style={{ boxShadow: "var(--shadow) var(--shadow) 0 var(--dp-color-ink)" }}
    >
      {mode === "static" && (
        <Image
          src={portrait.src}
          alt={portrait.alt}
          width={portrait.width}
          height={portrait.height}
          sizes="300px"
          priority
          className="absolute bottom-0 left-1/2 h-[88%] w-auto -translate-x-1/2"
        />
      )}
      {mode === "live" && art && (
        <div
          className="absolute"
          style={{ left: "-18%", top: "-15.3%", width: "136%", height: "136%", opacity: shown ? 1 : 0, transition: "opacity 0.25s ease" }}
        >
          <Lanyard
            frontImage={art.front}
            backImage={art.back}
            strapImage={art.strap}
            strapColor="#000000"
            cardColor="#fff5d6"
            size={0.75}
            strapLength={0}
            intro={false}
            damping={0.85}
            breeze={0.2}
            cornerRadius={0.25}
          />
        </div>
      )}
    </div>
  );
}
