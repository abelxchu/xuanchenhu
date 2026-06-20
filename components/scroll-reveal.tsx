// ============================================================
// 全域捲動進場：掃描頁面上帶 .reveal class 的元素，
// 進入視窗時加 .in-view 觸發淡入上浮（樣式在 globals.css）。
// 各區段只要在 className 加 "reveal" 即可，不必逐個包元件。
// 單頁站只有一次掛載，不需要依路由重新掃描。
// ============================================================
"use client";

import { useEffect } from "react";

export function ScrollReveal() {
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
  }, []);

  return null;
}
