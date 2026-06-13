// ============================================================
// 浮動數位名片 — 首頁主角。
// 游標在名片上移動時，名片會做 3D 視差傾斜（像 Vision Pro 的浮空卡片）；
// 點擊可翻面，背面顯示 TOGENERALIST。
// "use client" = 需要在瀏覽器執行 JS（追蹤游標、控制翻面狀態）。
// ============================================================
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";

// 傾斜的最大角度（度）。數字越大越誇張，12 度是舒服的範圍。
const MAX_TILT = 12;

export function FloatingCard() {
  const ref = useRef<HTMLDivElement>(null);
  // tilt：目前的傾斜角度；flipped：是否已翻面
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [flipped, setFlipped] = useState(false);

  // 游標在名片上移動 → 依游標相對位置算出傾斜角度
  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // px、py 範圍 -0.5 ~ 0.5（名片中心為 0）
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    // 上下移動控制 X 軸旋轉（負號讓它「往游標方向翹」）、左右控制 Y 軸
    setTilt({ rx: -py * MAX_TILT, ry: px * MAX_TILT });
  }

  // 游標離開 → 名片回正
  function handleLeave() {
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    // perspective 製造景深，子元素的 rotateX/Y 才會有 3D 透視效果
    <div
      style={{ perspective: "1000px" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        ref={ref}
        onClick={() => setFlipped((v) => !v)}
        className="relative h-[420px] w-[300px] cursor-pointer [transform-style:preserve-3d]"
        style={{
          // 翻面（rotateY 180）疊加游標傾斜；transition 讓動作柔順
          transform: `rotateX(${tilt.rx}deg) rotateY(${flipped ? 180 + tilt.ry : tilt.ry}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* ---------- 正面 ---------- */}
        <div className="glass absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-[28px] [backface-visibility:hidden]">
          <Image
            src="/images/headshot.png"
            alt={`Portrait of ${site.name}`}
            width={120}
            height={120}
            priority
            className="mb-2 h-28 w-28 rounded-full bg-line object-cover"
          />
          {/* 中文名（主）＋英文名（副）＋職稱 */}
          <h1 className="font-tc text-3xl font-semibold tracking-wide">
            {site.chineseName}
          </h1>
          <p className="text-sm text-muted">{site.name}</p>
          <p className="mt-1 text-base font-medium">{site.role}</p>
        </div>

        {/* ---------- 背面（預先旋轉 180 度，翻面後才正對使用者） ---------- */}
        <div className="glass-tint absolute inset-0 flex items-center justify-center rounded-[28px] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-xl font-medium tracking-[0.3em]">
            TOGENERALIST
          </span>
        </div>
      </div>
    </div>
  );
}
