/**
 * Amplitude-modulated halftone (print AM), not a CSS polka-dot fade.
 * Dot diameter tracks distance from a point off the right edge.
 * Lattice is rotated ~15° — the classic screen angle — so it does not
 * read as a wallpaper grid.
 */
const COLS = 52;
const ROWS = 38;
const ANGLE = (15 * Math.PI) / 180;
const COS = Math.cos(ANGLE);
const SIN = Math.sin(ANGLE);

function buildDots() {
  const dots: { cx: number; cy: number; r: number }[] = [];
  const ox = 108;
  const oy = 42;
  for (let j = -4; j < ROWS + 4; j++) {
    for (let i = -4; i < COLS + 4; i++) {
      const lx = (i / (COLS - 1)) * 100;
      const ly = (j / (ROWS - 1)) * 100;
      const cx = 50 + (lx - 50) * COS - (ly - 50) * SIN;
      const cy = 50 + (lx - 50) * SIN + (ly - 50) * COS;
      if (cx < -6 || cx > 108 || cy < -8 || cy > 108) continue;
      const t = Math.max(0, 1 - Math.hypot((cx - ox) * 1.35, (cy - oy) * 1.4) / 42);
      const r = 0.08 + t ** 2.1 * 0.72;
      if (r < 0.18 || cx < 62) continue;
      dots.push({
        cx: Math.round(cx * 1000) / 1000,
        cy: Math.round(cy * 1000) / 1000,
        r: Math.round(r * 1000) / 1000,
      });
    }
  }
  return dots;
}

const DOTS = buildDots();

export function HalftoneField() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 size-full opacity-40"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
    >
      <g fill="#ffd4bc">
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} />
        ))}
      </g>
    </svg>
  );
}
