// ============================================================
// 首頁：中央懸浮數位名片（主角）＋一句陳述，下方接全站分頁索引。
// 名片的 3D 傾斜互動在 components/floating-card.tsx。
// ============================================================
import Link from "next/link";
import { FloatingCard } from "@/components/floating-card";
import { nav } from "@/lib/site";

// 索引列表的內容：沿用 lib/site.ts 的導航順序，再各補一句描述。
// 想改描述文字就改這裡的 note。
const index = [
  {
    ...nav[0], // Work
    note: "Design, consulting, and the disciplines I think with.",
  },
  {
    ...nav[1], // About
    note: "Who I am, what I work with, and how to reach me.",
  },
  {
    ...nav[2], // Photography
    note: "Moments collected along the way.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5">
      {/* ---------- Hero：名片置中懸浮 ---------- */}
      <section className="flex flex-col items-center gap-10 py-16 text-center sm:py-20">
        <FloatingCard />

        {/* 名片下方的一句陳述：英文為主、中文點綴 */}
        <div className="max-w-md space-y-3">
          <p className="text-lg leading-relaxed text-ink">
            A relentless sense of urgency drives me to grow as a generalist —
            standing at the crossroads of humanity and technology.
          </p>
          <p className="font-tc text-sm leading-loose tracking-wide text-muted">
            站在人文與科技的交會口，建構一個更加人性化的世界。
          </p>
        </div>

        {/* 提示往下捲看分頁（小箭頭） */}
        <span aria-hidden className="text-2xl text-muted">
          ↓
        </span>
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
                <span className="flex-1 text-left">
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
