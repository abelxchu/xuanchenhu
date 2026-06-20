// ============================================================
// 全域捲動進場：掃描頁面上帶 .reveal class 的元素，
// 進入視窗時加 .in-view 觸發淡入上浮（樣式在 globals.css）。
// 各頁只要在區塊 className 加 "reveal" 即可，不必逐個包元件。
// 依 pathname 重新掃描，換頁後新頁的 .reveal 也會被接管。
// ============================================================
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in-view)");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target); // 出現一次就好
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
