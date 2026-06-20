// ============================================================
// 頁首：懸浮的玻璃膠囊導航列（像 iOS / visionOS 的浮動工具列）。
// 單頁版：導覽列連結＝頁內錨點（#about…），點了平滑捲到該段
// （平滑捲動由 globals 的 scroll-behavior 處理）；並用 scrollspy
// 隨捲動高亮目前所在的區段。桌面直接顯示；手機收進漢堡選單。
// "use client" = 需要在瀏覽器執行 JS（開關選單、偵測捲動位置）。
// ============================================================
"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [open, setOpen] = useState(false); // 手機版選單是否展開
  const [active, setActive] = useState(""); // 目前捲到的區段 id（scrollspy）

  // 選單展開時鎖住背景，不讓底下的頁面跟著捲動
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scrollspy：觀察各區段，哪一段落在視窗中段就標為 active。
  // rootMargin 上 -45%、下 -50%：等於用視窗約 45% 高度那條線當判定基準。
  useEffect(() => {
    const ids = nav.map((n) => n.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const isActive = (href: string) => href === `#${active}`;

  return (
    // fixed + 上方留白：導航列懸浮在內容上方，不貼邊（Apple 浮動工具列的作法）
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      {/* 玻璃膠囊本體 */}
      <div className="glass mx-auto flex h-14 w-full max-w-4xl items-center justify-between rounded-full pl-6 pr-2">
        {/* 左側字標，點了平滑捲回首屏 */}
        <a
          href="#top"
          className="text-sm font-semibold tracking-[0.18em] transition-colors hover:text-accent"
        >
          {site.shortName}
        </a>

        <div className="flex items-center gap-1">
          {/* 桌面版導航（sm 以上才顯示；手機版隱藏、改用漢堡選單）。
              目前區段用一顆小玻璃膠囊框起來（iOS 分段控制的感覺） */}
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Main">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "true" : undefined}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive(item.href)
                    ? "glass-raised text-accent" // 目前區段：玻璃膠囊＋品牌色
                    : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <ThemeToggle />

          {/* 手機版漢堡選單按鈕（sm 以上隱藏） */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open} // 告訴輔助科技選單目前是開還是關
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-accent sm:hidden"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {/* 開著顯示叉叉、關著顯示三條線 */}
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 手機版選單：從導航列下方展開的玻璃面板（只在 open 為 true 時渲染）。
          點任一連結即關閉選單，再平滑捲到該段。 */}
      {open && (
        <div className="glass mx-auto mt-3 flex w-full max-w-4xl flex-col gap-6 rounded-3xl p-6 sm:hidden">
          {/* 主要區段連結（大字） */}
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "true" : undefined}
                className={`rounded-2xl px-4 py-3 text-2xl font-medium tracking-tight transition-colors ${
                  isActive(item.href) ? "glass-raised text-accent" : "hover:text-accent"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          {/* 社群連結（小字，放分隔線下面） */}
          <div className="flex flex-wrap gap-4 border-t border-line px-4 pt-5">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer" // 安全性：避免新分頁能操控原頁面
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
