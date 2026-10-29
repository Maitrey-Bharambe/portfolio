"use client";

import { useEffect, useState } from "react";
import GooeyNav from "./GooeyNav";

// Brutalist take on GooeyNav: flat white frame, hard shadow, yellow pill, ink text.
const themeVars = {
  "--gn-frame": "transparent",
  "--gn-frame-edge": "transparent",
  "--gn-frame-highlight": "transparent",
  "--gn-frame-shadow": "none",
  "--gn-ink": "#000000",
  "--gn-muted": "#000000",
  backdropFilter: "none",
  fontWeight: 900,
  textTransform: "uppercase",
};

export default function DesktopNav({ items }) {
  const [active, setActive] = useState(0);

  // Follow the section nearest the top of the viewport.
  useEffect(() => {
    const els = items.map((i) => document.querySelector(i.href));
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let idx = 0;
      els.forEach((el, n) => {
        if (el && el.getBoundingClientRect().top <= line) idx = n;
      });
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <div className="hidden md:block">
      <GooeyNav
        items={items}
        activeIndex={active}
        onChange={setActive}
        theme="light"
        size="sm"
        color="#ffed00"
        activeTextColor="#000000"
        colors={["#ffed00", "#ff4332", "#d4bdff"]}
        particleCount={12}
        spread={44}
        animationTime={550}
        timeVariance={250}
        gooeyness={0.5}
        wobble={0.5}
        style={themeVars}
      />
    </div>
  );
}
