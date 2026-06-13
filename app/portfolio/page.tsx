// ============================================================
// Work 頁：合併了原本的 Field of Study。
// 結構順序：開場說明 → 工作領域 → Field of Study（知識系統）
//          → 最後 Request the Portfolio。
// 之後有可公開的 case study，照檔案最下方的註解擴充。
// ============================================================
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Product design, customer experience, and consulting — and the disciplines behind the work. Selected portfolio on request.",
};

// 三個業務領域卡片的內容，要改文案就改這裡
const practices = [
  {
    title: "Product & UX Design",
    body: "From research and flows to high-fidelity UI and prototypes — designing products that respect both the user and the business.",
  },
  {
    title: "Customer Experience",
    body: "Mapping and improving the journey end to end, so the experience holds together across every touchpoint, not just the screen.",
  },
  {
    title: "Consulting",
    body: "Helping teams frame the right problem before solving it — synthesizing insight across disciplines into clear, actionable direction.",
  },
];

// Field of Study 的知識領域：加新領域就加一筆；
// 白板做好了就補上 href，卡片自動變成可點擊。
const fields: {
  title: string;
  href?: string; // ? 表示可有可無
}[] = [
  {
    title: "Customer & UX Experience",
    href: "https://app.heptabase.com/w/e2ddd3477543b905e1b8fdcd1908babca7d6788433eeb9dcc896307972ce7242",
  },
  {
    title: "Psychology",
    href: "https://app.heptabase.com/w/a378a8d6a142690051580ac6552287375db6940ff6b7bac9c57fde9d219b5317",
  },
  {
    title: "Political Science",
    href: "https://app.heptabase.com/w/31dbe0d92274d76a14f3ffa5c466ae2352f86abcd03eeb8035e5aaefba8ef6c3",
  },
  { title: "User Interface" },  // 還沒有公開白板 → 顯示 In progress
  { title: "Programming" },
];

export default function PortfolioPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-16">
      <h1 className="mb-12 text-4xl font-semibold tracking-tight sm:text-5xl">
        Work
      </h1>

      {/* ---------- 開場說明：作品多為保密案，需來信索取 ---------- */}
      <section className="space-y-5 text-base leading-relaxed sm:text-lg">
        <p>
          I work across product design, customer experience, and consulting.
          Much of my client work is confidential, so the full portfolio is
          shared in person — reach out and I&apos;ll walk you through it.
        </p>
      </section>

      {/* ---------- 工作領域：三張玻璃卡片 ---------- */}
      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        {practices.map((p) => (
          <div key={p.title} className="glass rounded-3xl p-6">
            <h2 className="mb-2 text-lg font-medium tracking-tight">
              {p.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted">{p.body}</p>
          </div>
        ))}
      </section>

      {/* ---------- Field of Study（知識系統），用上分隔線分段 ---------- */}
      <section className="mt-16 border-t border-line pt-12">
        <h2 className="mb-3 text-2xl font-medium tracking-tight">
          Field of Study
        </h2>
        <p className="mb-8 max-w-xl text-base leading-relaxed text-muted">
          The disciplines behind the work — a living knowledge system built in
          Heptabase. Each field opens a public whiteboard of my notes, a work in
          progress by design.
        </p>

        {/* 卡片網格：手機一欄、平板以上兩欄 */}
        <ul className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) =>
            field.href ? (
              // 有連結的玻璃卡片：整張可點，hover 微微浮起＋變品牌色
              <li key={field.title}>
                <a
                  href={field.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group flex h-36 flex-col justify-between rounded-3xl p-6 transition-transform hover:-translate-y-0.5"
                >
                  <span className="text-xl font-medium leading-snug tracking-tight transition-colors group-hover:text-accent">
                    {field.title}
                  </span>
                  {/* 右下角箭頭，hover 時往右上飄一點 */}
                  <span
                    aria-hidden
                    className="self-end text-xl text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ) : (
              // 還沒開放的卡片：虛線框（視覺上「還沒成形」）
              <li
                key={field.title}
                className="flex h-36 flex-col justify-between rounded-3xl border border-dashed border-line p-6"
              >
                <span className="text-xl font-medium leading-snug tracking-tight text-muted">
                  {field.title}
                </span>
                <span className="glass self-end rounded-full px-3 py-1 text-xs tracking-wide text-muted">
                  In progress
                </span>
              </li>
            ),
          )}
        </ul>
      </section>

      {/* ---------- 最後：Request the Portfolio CTA ---------- */}
      <section className="mt-16 flex flex-wrap items-center gap-4 border-t border-line pt-12">
        <a
          href={`mailto:${site.email}?subject=Portfolio%20request`}
          className="glass-tint rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
        >
          Request the portfolio
        </a>
        <span className="text-sm text-muted">{site.email}</span>
      </section>

      {/*
        之後有可公開的 case study 時，建議加在「工作領域」與「Field of Study」之間，
        每個案例的結構：問題 → 你的角色 → 過程 → 成果。
      */}
    </div>
  );
}
