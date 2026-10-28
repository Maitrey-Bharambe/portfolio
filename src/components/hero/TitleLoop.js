import CurvedLoop from "@/components/ui/CurvedLoop";
import { loopTitles } from "@/data/profile";

// Full-bleed strip of moving text (no background) between the hero and the identity ledger. On narrow
// screens the loop is drawn wider than the viewport and cropped, so the letters
// stay large instead of shrinking with the width.
export default function TitleLoop() {
  return (
    <div className="overflow-x-clip py-2 text-ink md:py-4">
      <div style={{ width: "max(100%, 900px)", marginLeft: "calc(50% - max(50%, 450px))" }}>
        <CurvedLoop
          marqueeText={loopTitles.join(" / ")}
          separator="/"
          shape="wave"
          curveAmount={100}
          speed={1.4}
          fontSize={84}
          fontWeight={900}
          letterSpacing={-4}
          color="var(--dp-color-ink)"
          pauseOnHover
        />
      </div>
    </div>
  );
}
