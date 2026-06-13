// ============================================================
// 首頁：上半是 hero（名字＋印章＋自我陳述＋兩顆玻璃按鈕），
// 下半是全站頁面的編號索引，裝在一塊大玻璃面板裡。
// ============================================================
import Link from "next/link";
import { Seal } from "@/components/seal";
import { nav } from "@/lib/site";

// 索引列表的內容：沿用 lib/site.ts 的導航順序，再各補一句描述。
// 想改描述文字就改這裡的 note。
const index = [
  {
    ...nav[0], // Work
    note: "Product design, CX, and consulting — selected work on request.",
  },
  {
    ...nav[1], // About
    note: "Who I am, what I work with, and how to reach me.",
  },
  {
    ...nav[2], // Field of Study
    note: "A living knowledge system, built in Heptabase.",
  },
  {
    ...nav[3], // Photography
    note: "Moments collected along the way.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5">
      {/* ---------- Hero 區 ---------- */}
      <section className="flex flex-col gap-8 py-16 sm:py-24">
        <div className="flex items-start justify-between gap-6">
          <div>
            {/* 職稱小標（全大寫、字距拉開） */}
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-muted">
              Designer &amp; Consultant — Taipei
            </p>
            {/* 主標：名字。手機 5xl、桌面 7xl，tracking-tight 是 Apple 式緊湊字距 */}
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
              Xuan-Chen
              <br />
              (Abel) Hu
            </h1>
          </div>
          {/* 朱紅玻璃印章，靠右上 */}
          <Seal className="mt-1 shrink-0 text-lg sm:text-2xl" />
        </div>

        {/* 自我陳述：英文為主，下面一行中文點綴 */}
        <div className="max-w-xl space-y-4">
          <p className="text-lg leading-relaxed text-ink">
            A relentless sense of urgency drives me to grow as a generalist. I
            believe we can stand at the crossroads of humanity and technology —
            and build a more humane world.
          </p>
          <p className="font-tc text-sm leading-loose tracking-wide text-muted">
            站在人文與科技的交會口，建構一個更加人性化的世界。
          </p>
        </div>

        {/* 兩顆行動按鈕：主要（品牌色玻璃）＋次要（透明玻璃） */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/portfolio"
            className="glass-tint rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
          >
            View work
          </Link>
          <Link
            href="/about"
            className="glass rounded-full px-6 py-3 text-sm font-medium transition-colors hover:text-accent"
          >
            About me
          </Link>
        </div>
      </section>

      {/* ---------- 頁面索引（01 Work、02 About…），整組裝進玻璃面板 ---------- */}
      <section className="glass rounded-3xl p-2 sm:p-3">
        {/* divide-y：列與列之間自動加分隔線 */}
        <ul className="divide-y divide-line">
          {index.map((item, i) => (
            <li key={item.href}>
              {/* group：讓 hover 整列時，裡面的標題和箭頭一起變色 */}
              <Link
                href={item.href}
                className="group flex items-baseline gap-6 rounded-2xl px-4 py-6 transition-colors hover:bg-paper/50"
              >
                {/* 編號：01、02…（padStart 補零） */}
                <span className="text-sm text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block text-2xl font-medium tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {item.note}
                  </span>
                </span>
                {/* 箭頭：hover 時往右滑一點（translate-x-1） */}
                <span
                  aria-hidden // 純裝飾，不讓螢幕報讀器唸出來
                  className="text-xl text-muted transition-all group-hover:translate-x-1 group-hover:text-accent"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 底部留白，讓玻璃面板不貼著 footer */}
      <div className="h-16" />
    </div>
  );
}
