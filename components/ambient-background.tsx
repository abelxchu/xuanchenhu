// ============================================================
// 流動雲霧背景（izanami 風的氛圍點綴）。
// 用低解析度 canvas 畫幾團柔和的彩色光暈，緩慢飄移＋呼吸＋微跟游標，
// 再用 CSS blur 柔化成雲霧——取代原本 body::before 的靜態 CSS 光暈，
// 也整合了游標跟隨（不再需要 PointerGlow）。
// 低解析度（0.5x）＋少量 blob，效能輕、不拖慢載入。
// "use client" = 需要 canvas 與 requestAnimationFrame。
// ============================================================
"use client";

import { useEffect, useRef } from "react";

// 亮／暗各一組雲霧顏色（橘紅／靛藍／天藍，與品牌一致）
const PALETTES = {
  light: ["rgba(224,83,47,0.20)", "rgba(99,102,241,0.16)", "rgba(56,189,248,0.15)"],
  dark: ["rgba(224,83,47,0.26)", "rgba(99,102,241,0.22)", "rgba(14,165,233,0.18)"],
};

export function AmbientBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const SCALE = 0.5; // 畫一半解析度，CSS 放大＋blur 反而更柔、更省效能
    let w = 0;
    let h = 0;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    // 幾團雲霧：基準位置(bx,by)、半徑(r)、飄移速度(sx,sy)、相位(px,py)
    const blobs = [
      { bx: 0.22, by: 0.28, r: 0.5, sx: 0.00062, sy: 0.0005, px: 0, py: 2 },
      { bx: 0.8, by: 0.22, r: 0.45, sx: 0.00048, sy: 0.00068, px: 1.5, py: 0.5 },
      { bx: 0.58, by: 0.82, r: 0.55, sx: 0.00056, sy: 0.00044, px: 3, py: 4 },
    ];

    const resize = () => {
      w = canvas.width = Math.round(window.innerWidth * SCALE);
      h = canvas.height = Math.round(window.innerHeight * SCALE);
    };
    resize();
    window.addEventListener("resize", resize);

    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onPointer);

    let raf = 0;
    const draw = (time: number) => {
      const dark = document.documentElement.classList.contains("dark");
      const palette = dark ? PALETTES.dark : PALETTES.light;
      const bg =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--bg")
          .trim() || (dark ? "#16120d" : "#f4f4f6");

      // 填底色（canvas 不透明，直接當背景）
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // 游標緩慢跟隨（lerp）
      pointer.x += (pointer.tx - pointer.x) * 0.03;
      pointer.y += (pointer.ty - pointer.y) * 0.03;

      blobs.forEach((b, i) => {
        const driftX = reduce ? 0 : Math.sin(time * b.sx + b.px) * 0.16;
        const driftY = reduce ? 0 : Math.cos(time * b.sy + b.py) * 0.16;
        const gx = (pointer.x - 0.5) * 0.05 * (i + 1); // 各團受游標影響略不同
        const gy = (pointer.y - 0.5) * 0.05 * (i + 1);
        const cx = (b.bx + driftX + gx) * w;
        const cy = (b.by + driftY + gy) * h;
        const rad = b.r * Math.max(w, h);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        grad.addColorStop(0, palette[i % palette.length]);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    if (reduce) draw(0); // 減少動態：只畫靜止一幀
    else raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full [animation:ambient-in_1s_ease-out_both]"
      style={{ filter: "blur(44px)" }}
    />
  );
}
