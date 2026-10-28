import { ImageResponse } from "next/og";

export const alt = "Maitrey Bharambe | Data Scientist & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const strip = (bg, fg, text) => (
    <div style={{ display: "flex", background: bg, color: fg, padding: "0 18px", marginBottom: 10, border: "6px solid #000" }}>
      {text}
    </div>
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fff5d6",
          padding: 56,
          fontFamily: "Arial, sans-serif",
          fontWeight: 900,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#000" }}>MB/ — DATA SCIENCE & AI ENGINEERING</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 120, lineHeight: 1.05, alignItems: "flex-start" }}>
          {strip("#000", "#ffed00", "BUILDING")}
          {strip("#ffed00", "#000", "INTELLIGENCE.")}
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#000" }}>MAITREY BHARAMBE · DATA SCIENTIST & AI ENGINEER</div>
      </div>
    ),
    size
  );
}
