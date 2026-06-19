// ============================================================
// Coverflow 大圖輪播（Photography 頁用）。
// 中央一張大圖正面、兩側縮小並向內 3D 傾斜（Apple Cover Flow 感）。
// 切換方式：點側邊照片、點箭頭、點圓點、鍵盤左右。
// "use client" = 需要在瀏覽器執行 JS（目前張數、響應式尺寸、鍵盤）。
// ============================================================
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Photo = { src: string; alt: string };

export function PhotoCoverflow({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState(Math.floor(photos.length / 2)); // 預設中間那張
  const [w, setW] = useState(360); // 中央照片寬度（響應式）

  const prev = () => setActive((a) => Math.max(0, a - 1));
  const next = () => setActive((a) => Math.min(photos.length - 1, a + 1));

  // 響應式：照片寬度隨視窗（手機縮小）
  useEffect(() => {
    const update = () => setW(Math.min(window.innerWidth - 96, 360));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // 鍵盤左右切換
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photos.length]);

  const h = Math.round((w * 2) / 3); // 3:2

  // 每張照片依「與中央的距離」決定位置、傾斜、縮放、層級
  function styleFor(i: number): React.CSSProperties {
    const offset = i - active;
    const abs = Math.abs(offset);
    return {
      width: w,
      height: h,
      transform: `translate(-50%, -50%) translateX(${offset * w * 0.6}px) translateZ(${abs === 0 ? 0 : -180}px) rotateY(${offset * -42}deg) scale(${abs === 0 ? 1 : 0.9})`,
      opacity: abs > 2 ? 0 : 1, // 只顯示中央±2 張，更遠的淡出
      zIndex: 100 - abs,
      pointerEvents: abs > 2 ? "none" : "auto",
      transition:
        "transform 0.55s cubic-bezier(0.2,0.8,0.3,1), opacity 0.55s ease",
    };
  }

  return (
    <div>
      {/* 舞台：perspective 製造 3D 縱深，照片絕對定位疊在中心 */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: h + 48, perspective: "1200px" }}
      >
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`第 ${i + 1} 張，共 ${photos.length} 張`}
            aria-current={i === active}
            className="glass absolute left-1/2 top-1/2 cursor-pointer overflow-hidden rounded-2xl p-1 [transform-style:preserve-3d]"
            style={styleFor(i)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={360}
              height={240}
              sizes="360px"
              className="h-full w-full rounded-xl object-cover"
              priority={i === Math.floor(photos.length / 2)}
            />
          </button>
        ))}
      </div>

      {/* 控制列：左箭頭 ＋ 圓點 ＋ 右箭頭 */}
      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={prev}
          disabled={active === 0}
          aria-label="上一張"
          className="glass flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:text-accent disabled:opacity-30"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`跳到第 ${i + 1} 張`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-accent" : "w-2 bg-muted/50 hover:bg-muted"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          disabled={active === photos.length - 1}
          aria-label="下一張"
          className="glass flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:text-accent disabled:opacity-30"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
