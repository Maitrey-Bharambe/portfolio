// Draws the ID-card artwork (front, back, strap) on offscreen canvases and shares the
// result between the intro overlay and the hero slot, so the card looks identical in both.

const INK = "#000000";
const YELLOW = "#ffed00";
const RED = "#ff4332";
const VIOLET = "#d4bdff";
const GROUND = "#fff5d6";
const FONT = '"NeoBrutalismHost", "Arial Black", sans-serif';
const MONO = 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';

export function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function loadImg(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function box(ctx, x, y, w, h, fill, line = 14) {
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, w, h);
  if (line) {
    ctx.lineWidth = line;
    ctx.strokeStyle = INK;
    ctx.strokeRect(x, y, w, h);
  }
}

function drawFront(logo, photo, profile) {
  const W = 1024;
  const H = 1440;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  ctx.fillStyle = GROUND;
  ctx.fillRect(0, 0, W, H);

  // header band (the strap slot is cut out of the card around x 400-620, y 60-105)
  ctx.fillStyle = YELLOW;
  ctx.fillRect(0, 0, W, 230);
  ctx.fillStyle = INK;
  ctx.fillRect(0, 226, W, 14);
  if (logo) {
    ctx.save();
    ctx.translate(86, 100);
    ctx.rotate(-0.05);
    ctx.drawImage(logo, 0, 0, 120, 120);
    ctx.lineWidth = 10;
    ctx.strokeStyle = INK;
    ctx.strokeRect(0, 0, 120, 120);
    ctx.restore();
  }
  ctx.fillStyle = INK;
  ctx.textAlign = "right";
  ctx.font = `700 40px ${MONO}`;
  ctx.fillText("PORTFOLIO", W - 70, 150);
  ctx.font = `700 30px ${MONO}`;
  ctx.fillText(profile.location.toUpperCase(), W - 70, 196);

  // photo panel
  const px = 70;
  const py = 290;
  const pw = W - 140;
  const ph = 600;
  box(ctx, px, py, pw, ph, RED, 16);
  if (photo) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(px + 8, py + 8, pw - 16, ph - 16);
    ctx.clip();
    const scale = (pw - 16) / photo.width;
    const iw = photo.width * scale;
    const ih = photo.height * scale;
    ctx.drawImage(photo, px + 8 + (pw - 16 - iw) / 2, py + 8 + 20, iw, ih);
    ctx.restore();
  }
  // violet tag overlapping the photo corner
  ctx.save();
  ctx.translate(px + 40, py + ph - 70);
  ctx.rotate(-0.04);
  box(ctx, 0, 0, 300, 70, VIOLET, 10);
  ctx.fillStyle = INK;
  ctx.textAlign = "left";
  ctx.font = `800 34px ${MONO}`;
  ctx.fillText("MB/ 2026", 24, 48);
  ctx.restore();

  // name
  ctx.textAlign = "left";
  ctx.fillStyle = INK;
  ctx.font = `800 150px ${FONT}`;
  ctx.fillText("MAITREY", px, 1060);
  ctx.font = `800 130px ${FONT}`;
  ctx.fillText("BHARAMBE", px, 1185);

  // role chip
  box(ctx, px, 1240, pw, 96, INK, 0);
  ctx.fillStyle = YELLOW;
  ctx.font = `800 40px ${MONO}`;
  ctx.fillText("DATA SCIENTIST / AI ENGINEER", px + 30, 1303);

  ctx.fillStyle = INK;
  ctx.font = `700 30px ${MONO}`;
  ctx.fillText(profile.tagline.toUpperCase(), px, 1396);

  // card border
  ctx.lineWidth = 28;
  ctx.strokeStyle = INK;
  ctx.strokeRect(14, 14, W - 28, H - 28);
  return c.toDataURL("image/png");
}

function drawBack(logo, profile) {
  const W = 1024;
  const H = 1440;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  ctx.fillStyle = YELLOW;
  ctx.fillRect(0, 0, W, H);
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = INK;
  for (let i = -H; i < W + H; i += 70) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 30, 0);
    ctx.lineTo(i + 30 + H, H);
    ctx.lineTo(i + H, H);
    ctx.fill();
  }
  ctx.restore();
  if (logo) {
    ctx.save();
    ctx.translate(W / 2 - 260, 380);
    ctx.rotate(-0.05);
    ctx.drawImage(logo, 0, 0, 520, 520);
    ctx.lineWidth = 18;
    ctx.strokeStyle = INK;
    ctx.strokeRect(0, 0, 520, 520);
    ctx.restore();
  }
  ctx.textAlign = "center";
  ctx.fillStyle = INK;
  ctx.font = `800 84px ${FONT}`;
  ctx.fillText("MAITREY", W / 2, 1060);
  ctx.fillText("BHARAMBE", W / 2, 1150);
  box(ctx, 130, 1210, W - 260, 90, INK, 0);
  ctx.fillStyle = YELLOW;
  ctx.font = `800 36px ${MONO}`;
  ctx.fillText(profile.tagline.toUpperCase(), W / 2, 1268);
  ctx.fillStyle = INK;
  ctx.font = `700 32px ${MONO}`;
  ctx.fillText(profile.location.toUpperCase(), W / 2, 1360);
  ctx.lineWidth = 28;
  ctx.strokeStyle = INK;
  ctx.strokeRect(14, 14, W - 28, H - 28);
  return c.toDataURL("image/png");
}

function drawStrap() {
  const W = 1600;
  const H = 160;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = YELLOW;
  ctx.font = `800 84px ${FONT}`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  const text = "MAITREY BHARAMBE   /   DATA SCIENTIST   /   AI ENGINEER   /   ";
  const unit = ctx.measureText(text).width;
  const repeats = Math.max(1, Math.round(W / unit));
  // stretch so the tile repeats seamlessly
  ctx.save();
  ctx.scale(W / (unit * repeats), 1);
  for (let i = 0; i < repeats; i++) ctx.fillText(text, i * unit, H / 2 + 4);
  ctx.restore();
  return c.toDataURL("image/png");
}

let artPromise = null;

export function getLanyardArt(profile) {
  if (!artPromise) {
    artPromise = (async () => {
      try {
        await Promise.all([
          document.fonts?.load('800 100px "NeoBrutalismHost"'),
          document.fonts?.load(`700 40px ${MONO}`),
        ]);
      } catch {}
      const [logo, photo] = await Promise.all([loadImg("/images/logo.png"), loadImg("/images/profile/maitrey.webp")]);
      if (!photo) return null;
      return {
        front: drawFront(logo, photo, profile),
        back: drawBack(logo, profile),
        strap: drawStrap(),
      };
    })();
  }
  return artPromise;
}
