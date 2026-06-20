// ============================================================
// 背景光暈隨游標緩慢位移：把游標相對視窗中心的位置寫進 CSS 變數
// （--glow-x / --glow-y），globals.css 的 body::before 會據此平移，
// 多一層空間視差。觸控裝置沒有 pointermove，光暈就維持不動。
// 這個元件不渲染任何畫面，只掛事件。
// ============================================================
"use client";

import { useEffect } from "react";

export function PointerGlow() {
  useEffect(() => {
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40; // 最多 ±20px
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        const root = document.documentElement;
        root.style.setProperty("--glow-x", `${x}px`);
        root.style.setProperty("--glow-y", `${y}px`);
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
