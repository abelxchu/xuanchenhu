// ============================================================
// Field of Study 頁：知識領域卡片，連到 Heptabase 公開白板。
// 有 href 的是可點擊的玻璃卡片；沒有 href 的顯示為「In progress」虛線卡。
// ============================================================
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field of Study",
  description:
    "A living knowledge system built in Heptabase — customer experience, psychology, political science, and more.",
};

// 領域清單：加新領域就加一筆；白板做好了就補上 href，卡片自動變成可點擊
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

export default function FieldOfStudyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-16">
      <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Field of Study
      </h1>
      <p className="mb-12 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
        A living knowledge system, built in Heptabase. Each field opens a
        public whiteboard of my notes — a work in progress, by design.
      </p>

      {/* 卡片網格：手機一欄、平板以上兩欄 */}
      <ul className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) =>
          field.href ? (
            // ---------- 有連結的玻璃卡片：整張可點，hover 微微浮起＋變品牌色 ----------
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
            // ---------- 還沒開放的卡片：虛線框（不加玻璃，視覺上「還沒成形」） ----------
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
    </div>
  );
}
