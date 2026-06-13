import { site } from "@/lib/site";

/**
 * 朱紅直排印章 — 以中文名「胡軒塵」做成落款印章，
 * 是全站的個人識別元素（首頁 hero 右上角）。
 * 玻璃風版本：用 glass-tint（帶品牌色的玻璃）呈現，
 * 像一塊半透明的紅色玻璃磚。
 *
 * 用法：<Seal className="text-2xl" />
 * 文字大小由外部傳入的 className 控制，印章會跟著縮放。
 */
export function Seal({ className = "" }: { className?: string }) {
  return (
    <span
      aria-label={site.chineseName} // 給螢幕報讀器唸的文字
      className={`glass-tint inline-flex select-none items-center justify-center rounded-xl px-2 py-3 font-tc font-semibold leading-none tracking-[0.35em] ${className}`}
      // writing-mode: vertical-rl 讓文字直排（由上到下），像傳統印章
      style={{ writingMode: "vertical-rl" }}
    >
      {site.chineseName}
    </span>
  );
}
