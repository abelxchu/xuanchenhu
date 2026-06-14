// ============================================================
// 浮動數位名片 — 首頁主角。互動效果分層處理：
//   進場動畫 → 閒置漂浮 → 游標 3D 傾斜 → 光澤反射 → 點擊翻面
// 每一層各司其職、互不干擾（外層 2D 動畫不會破壞內層的 3D 透視鏈）。
// "use client" = 需要在瀏覽器執行 JS（追蹤游標、控制狀態）。
// ============================================================
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";

// 傾斜的最大角度（度）。數字越大越誇張，12 度是舒服的範圍。
const MAX_TILT = 12;

export function FloatingCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  // glare：光澤高光在名片表面的位置（百分比）與不透明度
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false); // 用來在 hover 時暫停閒置漂浮

  // 游標在名片上移動 → 一次算出「傾斜角度」與「光澤位置」
  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0 ~ 1
    const py = (e.clientY - r.top) / r.height;
    // 上下移動控制 X 軸旋轉（負號讓它往游標方向翹）、左右控制 Y 軸
    setTilt({ rx: -(py - 0.5) * MAX_TILT, ry: (px - 0.5) * MAX_TILT });
    // 光澤跟著游標跑
    setGlare({ x: px * 100, y: py * 100, o: 1 });
  }

  function handleEnter() {
    setHovered(true);
  }

  // 游標離開 → 名片回正、光澤淡出、恢復閒置漂浮
  function handleLeave() {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
    setGlare((g) => ({ ...g, o: 0 }));
  }

  return (
    // 第 1 層：進場動畫（淡入上浮，只播一次）
    <div
      data-card-entrance
      className="[animation:card-entrance_0.8s_ease-out_both]"
    >
      {/* 第 2 層：閒置漂浮（hover 時暫停，把主導權交給游標） */}
      <div
        data-card-float
        className="[animation:card-float_6s_ease-in-out_infinite]"
        style={{ animationPlayState: hovered ? "paused" : "running" }}
      >
        {/* 第 3 層：perspective 製造景深，子層的 rotateX/Y 才有 3D 透視 */}
        <div
          style={{ perspective: "1000px" }}
          onMouseMove={handleMove}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {/* 第 4 層：傾斜 + 翻面的卡片本體 */}
          <div
            ref={ref}
            onClick={() => setFlipped((v) => !v)}
            className="relative h-[420px] w-[300px] cursor-pointer [transform-style:preserve-3d]"
            style={{
              transform: `rotateX(${tilt.rx}deg) rotateY(${flipped ? 180 + tilt.ry : tilt.ry}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            {/* ---------- 正面 ---------- */}
            <div className="glass absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden rounded-[28px] [backface-visibility:hidden]">
              <Image
                src="/images/headshot.png"
                alt={`Portrait of ${site.name}`}
                width={120}
                height={120}
                priority
                className="mb-2 h-28 w-28 rounded-full bg-line object-cover"
              />
              <h1 className="font-tc text-3xl font-semibold tracking-wide">
                {site.chineseName}
              </h1>
              <p className="text-sm text-muted">{site.name}</p>
              <p className="mt-1 text-base font-medium">{site.role}</p>

              {/* 光澤反射：一道白色高光跟著游標在玻璃表面滑動。
                  mix-blend soft-light 讓它像真玻璃反光、不死白。 */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 [mix-blend-mode:soft-light]"
                style={{
                  background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.7), transparent 55%)`,
                  opacity: glare.o,
                  transition: "opacity 0.3s ease-out",
                }}
              />
            </div>

            {/* ---------- 背面（預先轉 180 度，翻面後才正對使用者） ---------- */}
            <div className="glass-tint absolute inset-0 flex items-center justify-center rounded-[28px] [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <span className="text-xl font-medium tracking-[0.3em]">
                TOGENERALIST
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
