"use client";

import { useEffect, useRef, useState } from "react";
import { Database, Network, BrainCircuit, Settings, TrendingUp, CodeXml, Lightbulb } from "lucide-react";
import { principles } from "@/data/profile";
import { cx } from "@/lib/utils";

const ICONS = {
  database: Database,
  network: Network,
  brain: BrainCircuit,
  gear: Settings,
  chart: TrendingUp,
  code: CodeXml,
  bulb: Lightbulb,
};

// Desktop layout is drawn on a fixed 1200 x 1000 design grid that scales with the container.
const W = 1200;
const H = 1000;
const CENTER = [50, 50]; // percent
const CARD_HALF = [11.5, 15.5]; // approximate half size of a card, percent
// Percent positions of the seven nodes, in loop order.
const POS = [
  [50, 14],
  [80, 26],
  [86.5, 57],
  [66, 86],
  [34, 86],
  [13.5, 57],
  [20, 26],
];

// Coordinates are rounded so server and client render identical SVG attributes.
const r2 = (n) => Math.round(n * 100) / 100;
const px = ([x, y]) => [r2((x / 100) * W), r2((y / 100) * H)];
const insideCard = ([x, y]) =>
  POS.some(([cx0, cy0]) => Math.abs(x - cx0) < CARD_HALF[0] + 1 && Math.abs(y - cy0) < CARD_HALF[1] + 1);

// Midpoints of the loop links (node i -> node i+1), shifted along the link until they are
// not hidden under a card. A link with no free spot gets no arrow.
const links = POS.map((from, i) => {
  const to = POS[(i + 1) % POS.length];
  for (const t of [0.5, 0.42, 0.58, 0.34, 0.66, 0.26, 0.74]) {
    const p = [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t];
    if (!insideCard(p) && Math.hypot(p[0] - CENTER[0], (p[1] - CENTER[1]) * 0.8) > 14) {
      const a = px(from);
      const b = px(to);
      return { from: a, to: b, mid: px(p), angle: r2((Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI) };
    }
  }
  const a = px(from);
  const b = px(to);
  return { from: a, to: b, mid: null, angle: 0 };
});

const spokes = POS.map((pos) => {
  const [cx0, cy0] = px(CENTER);
  const [x, y] = px(pos);
  const phi = Math.atan2(y - cy0, x - cx0);
  const r = 0.11 * W; // radius of the central node
  return { x, y, dot: [r2(cx0 + Math.cos(phi) * r), r2(cy0 + Math.sin(phi) * r)] };
});

function CenterNode({ className, style }) {
  return (
    <div
      className={cx(
        className?.includes("absolute") ? "" : "relative",
        "grid aspect-square place-items-center overflow-hidden rounded-full border-[5px] border-ink bg-emphasis",
        className
      )}
      style={{ boxShadow: "8px 8px 0 var(--dp-color-ink)", ...style }}
    >
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <BrainCircuit size={40} strokeWidth={2.5} aria-hidden />
        <p className="display mt-2 text-[clamp(1.4rem,2.3vw,2.2rem)] leading-[0.9]">
          Knowledge
          <br />
          Graph
        </p>
        <p className="mono mt-3 bg-ink px-2 py-1 text-emphasis">My mental model</p>
      </div>
    </div>
  );
}

function PrincipleCard({ item, index, active, selected, onHover, onFocus, onSelect, className, style }) {
  const Icon = ICONS[item.icon];
  const isActive = active === item.id;
  const dimmed = active && !isActive;
  const yellow = index % 2 === 0;
  return (
    <li
      id={`principle-${item.id}`}
      className={cx(
        className?.includes("absolute") ? "" : "relative",
        "border-4 border-ink bg-contrast p-4 pt-5 transition-[transform,opacity,box-shadow] duration-150",
        dimmed && "opacity-60",
        isActive && "scale-[1.03]",
        className
      )}
      style={{
        boxShadow: isActive ? "10px 10px 0 var(--dp-color-ink)" : "6px 6px 0 var(--dp-color-ink)",
        ...style,
      }}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
    >
      <span
        aria-hidden="true"
        className={cx(
          "absolute -left-4 -top-4 grid h-12 w-12 place-items-center rounded-full border-4 border-ink",
          yellow ? "bg-emphasis" : "bg-field"
        )}
      >
        <Icon size={22} strokeWidth={2.6} />
      </span>
      <h3 className="pl-9">
        <button
          type="button"
          aria-pressed={selected === item.id}
          onClick={() => onSelect(item.id)}
          onFocus={() => onFocus(item.id)}
          onBlur={() => onFocus(null)}
          className={cx(
            "block w-full px-2 py-1 text-left text-[15px] font-black uppercase leading-tight tracking-tight",
            isActive ? "bg-ink text-emphasis" : yellow ? "bg-emphasis" : "bg-field"
          )}
        >
          <span className="mono mr-1">{item.n}</span> {item.title}
        </button>
      </h3>
      <p className="mt-3 text-[13px] font-bold leading-snug">{item.text}</p>
      <ul className="mt-2 space-y-0.5 text-[12px] font-semibold leading-snug">
        {item.points.map((point) => (
          <li key={point} className="flex gap-1.5">
            <span aria-hidden="true">/</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function PrinciplesGraph() {
  const rootRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [hover, setHover] = useState(null);
  const [focus, setFocus] = useState(null);
  const [selected, setSelected] = useState(null);
  const active = hover ?? focus ?? selected;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (rootRef.current) io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  const toggle = (id) => setSelected((cur) => (cur === id ? null : id));
  const jumpTo = (id) => {
    setSelected(id);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(`principle-${id}`)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };
  const activeIndex = principles.findIndex((p) => p.id === active);
  const rise = (delay) => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? undefined : "translateY(14px)",
    transition: `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`,
  });

  return (
    <div ref={rootRef}>
      {/* Wide screens: radial graph */}
      <div className="relative mx-auto hidden w-full max-w-[1180px] min-[1180px]:block" style={{ aspectRatio: `${W} / ${H}`, zoom: 0.85 }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
          {/* loop links between neighbouring principles */}
          {links.map((l, i) => {
            const lit = activeIndex === i || activeIndex === (i + 1) % POS.length;
            return (
              <g key={`link-${i}`} style={{ opacity: revealed ? (active && !lit ? 0.3 : 1) : 0, transition: `opacity 0.4s ease ${0.9 + i * 0.05}s` }}>
                <line x1={l.from[0]} y1={l.from[1]} x2={l.to[0]} y2={l.to[1]} stroke="#080808" strokeWidth={lit ? 4 : 2.5} strokeDasharray="10 9" />
                {l.mid && (
                  <polygon
                    points="-11,-9 9,0 -11,9"
                    fill="#080808"
                    transform={`translate(${l.mid[0]} ${l.mid[1]}) rotate(${l.angle})`}
                  />
                )}
              </g>
            );
          })}
          {/* spokes from the central node */}
          {spokes.map((s, i) => {
            const lit = activeIndex === i;
            return (
              <g key={`spoke-${i}`} style={{ opacity: active && !lit ? 0.35 : 1, transition: "opacity 0.15s" }}>
                <line
                  x1={px(CENTER)[0]}
                  y1={px(CENTER)[1]}
                  x2={s.x}
                  y2={s.y}
                  stroke="#080808"
                  strokeWidth={lit ? 7 : 4}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={revealed ? 0 : 1}
                  style={{ transition: `stroke-dashoffset 0.6s ease ${0.35 + i * 0.07}s, stroke-width 0.15s` }}
                />
                <circle
                  cx={s.dot[0]}
                  cy={s.dot[1]}
                  r={lit ? 11 : 8}
                  fill={lit ? "#FFEB00" : "#fff"}
                  stroke="#080808"
                  strokeWidth={4}
                  style={{ opacity: revealed ? 1 : 0, transition: `opacity 0.3s ease ${0.7 + i * 0.07}s` }}
                />
              </g>
            );
          })}
        </svg>

        <CenterNode
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            width: "22%",
            transform: `translate(-50%, -50%) scale(${revealed ? 1 : 0.7})`,
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.4s ease, transform 0.45s ease",
          }}
        />

        <ol className="absolute inset-0 list-none">
          {principles.map((item, i) => (
            <PrincipleCard
              key={item.id}
              item={item}
              index={i}
              active={active}
              selected={selected}
              onHover={setHover}
              onFocus={setFocus}
              onSelect={toggle}
              className="absolute w-[23%] -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${POS[i][0]}%`,
                top: `${POS[i][1]}%`,
                ...(revealed ? null : { opacity: 0 }),
              }}
            />
          ))}
        </ol>

        {/* sketch accents */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-[13%] rotate-3 border-[3px] border-ink bg-emphasis p-3 text-[13px] font-black uppercase leading-tight"
          style={rise(1.1)}
        >
          Better data
          <br />
          → smarter
          <br />
          decisions
        </div>
        <svg aria-hidden="true" viewBox="0 0 80 70" className="absolute bottom-0 right-0 w-[7%]" style={rise(1.2)}>
          <rect x="6" y="42" width="14" height="24" fill="#FFEB00" stroke="#080808" strokeWidth="3" />
          <rect x="28" y="28" width="14" height="38" fill="#FFEB00" stroke="#080808" strokeWidth="3" />
          <rect x="50" y="12" width="14" height="54" fill="#FFEB00" stroke="#080808" strokeWidth="3" />
          <path d="M4 30 L30 14 L50 4 L72 2" fill="none" stroke="#080808" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Tablet and mobile: central node, a compact connection index, then the principles */}
      <div className="min-[1180px]:hidden">
        <CenterNode className="mx-auto w-60 sm:w-72" />
        <div aria-hidden="true" className="mx-auto h-8 w-1 bg-ink" />

        <nav aria-label="Principles index" className="mx-auto max-w-md">
          <ol className="relative flex items-center justify-between">
            <span aria-hidden="true" className="absolute inset-x-5 top-1/2 h-1 -translate-y-1/2 bg-ink" />
            {principles.map((p) => (
              <li key={p.id} className="relative">
                <button
                  type="button"
                  onClick={() => jumpTo(p.id)}
                  aria-label={`${p.n}. ${p.title}`}
                  aria-pressed={selected === p.id}
                  className={cx(
                    "grid h-11 w-11 place-items-center rounded-full border-4 border-ink text-xs font-black",
                    selected === p.id ? "bg-ink text-emphasis" : "bg-emphasis"
                  )}
                >
                  {p.n.replace(/^0/, "")}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <ol className="mt-10 grid list-none gap-8 pl-4 pt-2 md:grid-cols-2">
          {principles.map((item, i) => (
            <PrincipleCard
              key={item.id}
              item={item}
              index={i}
              active={active}
              selected={selected}
              onHover={setHover}
              onFocus={setFocus}
              onSelect={toggle}
              style={{ ...(revealed ? null : { opacity: 0 }), transition: "opacity 0.4s ease" }}
            />
          ))}
        </ol>
        <p className="mono mt-8 text-center">Learn &amp; evolve feeds back into Understand the data.</p>
      </div>
    </div>
  );
}
