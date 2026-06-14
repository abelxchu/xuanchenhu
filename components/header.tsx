// ============================================================
// 頁首：懸浮的玻璃膠囊導航列（像 iOS / visionOS 的浮動工具列）。
// 桌面版直接顯示導航；手機版收進漢堡選單（展開成玻璃面板）。
// "use client" = 這個元件需要在瀏覽器執行 JS（開關選單、偵測目前頁面）。
// ============================================================
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const pathname = usePathname();          // 目前所在頁面的路徑，用來標示 active 連結
  const [open, setOpen] = useState(false); // 手機版選單是否展開

  // 切換到別頁時自動關閉選單
  useEffect(() => setOpen(false), [pathname]);

  // 選單展開時鎖住背景，不讓底下的頁面跟著捲動
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = ""; // 元件移除時恢復捲動
    };
  }, [open]);

  // 判斷某個連結是不是目前頁面（路徑結尾可能多一個斜線，兩種都算）
  const isActive = (href: string) =>
    pathname === href || pathname === `${href}/`;

  return (
    // fixed + 上方留白：導航列懸浮在內容上方，不貼邊（Apple 浮動工具列的作法）
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      {/* 玻璃膠囊本體 */}
      <div className="glass mx-auto flex h-14 w-full max-w-4xl items-center justify-between rounded-full pl-6 pr-2">
        {/* 左側字標，點了回首頁 */}
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.18em] transition-colors hover:text-accent"
        >
          {site.shortName}
        </Link>

        <div className="flex items-center gap-1">
          {/* 桌面版導航（sm 以上才顯示；手機版隱藏、改用漢堡選單）。
              目前頁面用一顆小玻璃膠囊框起來（iOS 分段控制的感覺） */}
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive(item.href)
                    ? "glass-raised text-accent" // 目前頁面：玻璃膠囊＋品牌色
                    : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
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

      {/* 手機版選單：從導航列下方展開的玻璃面板（只在 open 為 true 時渲染） */}
      {open && (
        <div className="glass mx-auto mt-3 flex w-full max-w-4xl flex-col gap-6 rounded-3xl p-6 sm:hidden">
          {/* 主要頁面連結（大字） */}
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-3 text-2xl font-medium tracking-tight transition-colors ${
                  isActive(item.href) ? "glass-raised text-accent" : "hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
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
