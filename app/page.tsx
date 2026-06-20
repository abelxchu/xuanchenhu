// ============================================================
// 首頁＝整站（單頁捲動）：首屏浮動名片 → About → Work → Contact。
// 導覽列點選＝平滑捲到對應 id 區段（見 components/header.tsx）。
// 背景光暈（AmbientBackground）連續鋪在整頁後面，捲動時一路跟著飄。
// ============================================================
import { FloatingCard } from "@/components/floating-card";
import { AboutSection } from "@/components/about-section";
import { WorkSection } from "@/components/work-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <>
      {/* ---------- 首屏 HERO：浮動名片＋一句陳述＋往下探索提示 ---------- */}
      <section
        id="top"
        className="mx-auto flex min-h-[78svh] w-full max-w-4xl flex-col items-center justify-center gap-10 px-5 py-12 text-center"
      >
        {/* 主角：懸浮名片（傾斜／光澤／漂浮） */}
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

        {/* 往下探索提示：點了平滑捲到 About；緩慢上下跳動示意可捲動 */}
        <a
          href="#about"
          aria-label="Scroll to About"
          className="mt-2 text-muted transition-colors hover:text-accent [animation:scroll-cue_2.2s_ease-in-out_infinite]"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      </section>

      <AboutSection />
      <WorkSection />
      <ContactSection />
    </>
  );
}
