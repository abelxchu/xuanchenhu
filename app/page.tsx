// ============================================================
// 首頁：中央懸浮數位名片（主角）＋一句陳述＋一行細連結。
// 刻意極簡——導航主要交給 header，這裡只放輕量的分頁入口。
// 名片的 3D 傾斜互動在 components/floating-card.tsx。
// ============================================================
import Link from "next/link";
import { FloatingCard } from "@/components/floating-card";
import { nav } from "@/lib/site";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-5">
      <section className="flex flex-col items-center gap-10 py-16 text-center">
        {/* 主角：懸浮名片 */}
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

        {/* 一行細連結：輕量的分頁入口（像簽名），順序沿用 lib/site.ts 的 nav */}
        <nav
          aria-label="Sections"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </section>
    </div>
  );
}
