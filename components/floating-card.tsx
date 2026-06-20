// ============================================================
// 浮動數位名片 — 首頁主角。互動分層：
//   進場動畫 → 閒置漂浮 → 游標 3D 傾斜 → 光澤反射
// 單頁改版後拿掉「點擊連體展開索引」（導覽列已負責找路），
// 名片回歸單純的視覺主角，不可點、不展開。
// "use client" = 需要在瀏覽器執行 JS（追蹤游標、控制狀態）。
// ============================================================
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site, basePath } from "@/lib/site";

// 傾斜的最大角度（度）。數字越大越誇張，12 度是舒服的範圍。
const MAX_TILT = 12;

// 模組層級旗標：是否已經演過一次進場。
// 整頁 reload 會重建模組（重置為 false）＝伴隨開場幕的首次載入；
// client 端切頁不會重置（維持 true）＝沒有開場幕的回首頁。
let entrancePlayed = false;

export function FloatingCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });
  const [hovered, setHovered] = useState(false);

  // 首次載入：延遲 2.5s 等開場字樣飄散時才升起，與幕對拍。
  // 之後從別頁切回：沒有幕，直接快速升起、不延遲，免得乾等一片空白。
  const [firstLoad] = useState(() => !entrancePlayed);
  useEffect(() => {
    entrancePlayed = true;
  }, []);
  const entranceAnim = firstLoad
    ? "[animation:card-entrance_1.3s_ease-out_2.5s_both]"
    : "[animation:card-entrance_0.7s_ease-out_both]";
  const floatAnim = firstLoad
    ? "[animation:card-float_6s_ease-in-out_3.9s_infinite]"
    : "[animation:card-float_6s_ease-in-out_0.9s_infinite]";

  // 游標移動 → 傾斜與光澤
  function handleMove(e: React.MouseEvent) {
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

  return (
    // 第 1 層：進場動畫。首次載入延遲與開場幕對拍，回首頁則快速升起（見上）。
    <div data-card-entrance className={entranceAnim}>
      {/* 第 2 層：閒置漂浮（hover 時暫停） */}
      <div
        data-card-float
        className={floatAnim}
        style={{ animationPlayState: hovered ? "paused" : "running" }}
      >
        {/* 第 3 層：perspective 製造景深 */}
        <div
          style={{ perspective: "1000px" }}
          onMouseMove={handleMove}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {/* 第 4 層：名片本體（固定 300×420） */}
          <div
            ref={ref}
            className="glass relative flex h-[420px] w-[300px] flex-col items-center justify-center gap-3 overflow-hidden rounded-[28px]"
            style={{
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            <Image
              src={`${basePath}/images/headshot.png`}
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
            <div className="mt-1 text-xs leading-relaxed text-muted">
              {site.roleSub.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            {/* 光澤反射：白色高光跟著游標滑動 */}
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
        </div>
      </div>
    </div>
  );
}
