// ============================================================
// 浮動數位名片 — 首頁主角。互動效果分層處理：
//   進場動畫 → 閒置漂浮 → 游標 3D 傾斜 → 光澤反射 → 點擊展開索引面板
// 點擊名片 → 整塊玻璃「連體」向右展開（變體 A）：左名片、右索引，
// 中間一條分隔線，像 Apple Music 視窗。再點名片收合。
// "use client" = 需要在瀏覽器執行 JS（追蹤游標、控制狀態）。
// ============================================================
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site, nav } from "@/lib/site";

// 傾斜的最大角度（度）。數字越大越誇張，12 度是舒服的範圍。
const MAX_TILT = 12;

export function FloatingCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false); // 點擊後連體展開

  // 游標移動 → 傾斜與光澤；展開後讓名片靜止
  function handleMove(e: React.MouseEvent) {
    if (expanded) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ rx: -(py - 0.5) * MAX_TILT, ry: (px - 0.5) * MAX_TILT });
    setGlare({ x: px * 100, y: py * 100, o: 1 });
  }

  function handleEnter() {
    setHovered(true);
  }

  function handleLeave() {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
    setGlare((g) => ({ ...g, o: 0 }));
  }

  // 點擊展開／收合；同時把傾斜與光澤歸零，
  // 避免名片卡在點擊當下的傾斜角度與高光（不必移出滑鼠才復原）。
  function toggleExpand() {
    setExpanded((v) => !v);
    setTilt({ rx: 0, ry: 0 });
    setGlare((g) => ({ ...g, o: 0 }));
  }

  return (
    // 第 1 層：進場動畫
    <div
      data-card-entrance
      className="[animation:card-entrance_0.8s_ease-out_both]"
    >
      {/* 第 2 層：閒置漂浮（hover 或展開時暫停） */}
      <div
        data-card-float
        className="[animation:card-float_6s_ease-in-out_infinite]"
        style={{
          animationPlayState: hovered || expanded ? "paused" : "running",
        }}
      >
        {/* 第 3 層：perspective 製造景深 */}
        <div
          style={{ perspective: "1000px" }}
          onMouseMove={handleMove}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {/* 第 4 層：連體卡 — 展開時寬度從 300 → 580，左名片右索引 */}
          <div
            ref={ref}
            onClick={toggleExpand}
            role="button"
            tabIndex={0}
            aria-expanded={expanded}
            aria-label="展開導覽"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleExpand();
              }
            }}
            className="glass relative flex h-[420px] cursor-pointer overflow-hidden rounded-[28px]"
            style={{
              width: expanded ? "580px" : "300px",
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition:
                "width 0.4s cubic-bezier(0.2,0.9,0.3,1.05), transform 0.15s ease-out",
            }}
          >
            {/* ---------- 左欄：名片 ---------- */}
            <div className="relative flex w-[300px] shrink-0 flex-col items-center justify-center gap-3">
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

              {/* 光澤反射：白色高光跟著游標滑動（只蓋名片左欄） */}
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

            {/* ---------- 右欄：索引（展開才出現，與左欄共用同一塊玻璃） ---------- */}
            {expanded && (
              <nav
                aria-label="Sections"
                className="glass-sunken flex flex-1 flex-col border-l border-line p-3 [animation:panel-in_0.4s_ease-out_both]"
              >
                <ul className="flex flex-1 flex-col gap-1.5">
                  {nav.map((item, i) => (
                    <li key={item.href} className="flex-1">
                      <Link
                        href={item.href}
                        className="group flex h-full items-center gap-3 rounded-2xl px-4 transition-colors hover:bg-[var(--glass-raised-bg)]"
                      >
                        <span className="text-xs text-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-lg font-medium tracking-tight transition-colors group-hover:text-accent">
                          {item.label}
                        </span>
                        <span
                          aria-hidden
                          className="text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
