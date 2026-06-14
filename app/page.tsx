// ============================================================
// 首頁：中央懸浮數位名片（主角）＋一句陳述。
// 點擊名片會在右側展開分頁索引面板（見 components/floating-card.tsx）。
// ============================================================
import { FloatingCard } from "@/components/floating-card";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-5">
      <section className="flex flex-col items-center gap-10 py-16 text-center">
        {/* 主角：懸浮名片（點擊展開右側索引面板） */}
        <FloatingCard />

        {/* 名片下方的一句陳述：英文為主、中文點綴 */}
        <div className="max-w-md space-y-3">
          <p className="text-lg leading-relaxed text-ink">
            Exploring the intersection of people, technology, and business —
            turning insights into products, strategies, and meaningful
            experiences.
          </p>
          <p className="font-tc text-sm leading-loose tracking-wide text-muted">
            站在人文與科技的交會口，建構一個更加人性化的世界。
          </p>
        </div>
      </section>
    </div>
  );
}
