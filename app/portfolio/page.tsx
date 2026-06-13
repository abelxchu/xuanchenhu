// ============================================================
// Work（作品）頁：說明工作領域＋索取作品集的 CTA。
// 玻璃風版本：三個領域是獨立的玻璃卡片。
// 之後有可公開的 case study，照檔案最下方的註解擴充。
// ============================================================
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Product design, customer experience, and consulting. Selected work available on request.",
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

export default function PortfolioPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-16">
      <h1 className="mb-12 text-4xl font-semibold tracking-tight sm:text-5xl">
        Work
      </h1>

      {/* 開場說明：作品多為保密案，需來信索取 */}
      <section className="space-y-5 text-base leading-relaxed sm:text-lg">
        <p>
          I work across product design, customer experience, and consulting.
          Much of my client work is confidential, so the full portfolio is
          shared in person — reach out and I&apos;ll walk you through it.
        </p>
      </section>

      {/* 三張玻璃卡片，平板以上排成三欄 */}
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

      {/* CTA：點按鈕開 Email、主旨自動帶「Portfolio request」 */}
      <section className="mt-12 flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${site.email}?subject=Portfolio%20request`}
          className="glass-tint rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
        >
          Request the portfolio
        </a>
        <span className="text-sm text-muted">{site.email}</span>
      </section>

      {/*
        之後有可公開的 case study 時，在這裡加上玻璃卡片區塊，
        每個案例建議的結構：問題 → 你的角色 → 過程 → 成果。
      */}
    </div>
  );
}
