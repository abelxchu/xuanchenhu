// ============================================================
// 亮／暗主題切換按鈕。
// 原理：在 <html> 上加或移除 .dark class（globals.css 會換掉整組顏色變數），
// 並把選擇存進 localStorage，下次進站由 layout 的初始化腳本讀回來。
// ============================================================
"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);       // 目前是不是暗色模式
  const [mounted, setMounted] = useState(false); // 元件是否已在瀏覽器端載入完成

  // 載入後讀取 <html> 上的實際狀態（主題是由 layout 的腳本先設定好的）
  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next); // 切換全站顏色
    try {
      localStorage.theme = next ? "dark" : "light"; // 記住偏好
    } catch {} // 無痕模式可能不給寫入，失敗就算了
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-accent"
    >
      {/* mounted 之前固定畫太陽：伺服器端不知道使用者的主題，
          先統一渲染一種，等瀏覽器端確認後再換，避免 React 報前後不一致 */}
      {mounted && dark ? (
        // 月亮圖示（目前是暗色，點了切回亮色）
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      ) : (
        // 太陽圖示（目前是亮色，點了切到暗色）
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}
