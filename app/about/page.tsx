// ============================================================
// About 頁：自我介紹＋常用工具＋聯絡方式。
// 玻璃風版本：工具與聯絡資訊各裝在一塊玻璃面板裡。
// ============================================================
import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

// 這一頁專屬的 SEO 標題與描述（標題會變成「About — Xuan-Chen Hu」）
export const metadata: Metadata = {
  title: "About",
  description:
    "Designer and consultant in Taipei. Political science, psychology, and UX — synthesized into product and customer experience work.",
};

// 工具清單：要加減工具就改這個陣列。
// 刻意只放文字、不抓各家網站的 favicon（外部圖示常失效又拖慢載入）。
const tools = [
  { label: "Heptabase", href: "https://heptabase.com/" },
  { label: "Notion", href: "https://www.notion.so/" },
  { label: "Figma", href: "https://www.figma.com/" },
  { label: "ProtoPie", href: "https://www.protopie.io/" },
  { label: "Adobe Creative Cloud", href: "https://www.adobe.com/creativecloud.html" },
  { label: "Perplexity", href: "https://www.perplexity.ai/" },
  { label: "ChatGPT", href: "https://chatgpt.com/" },
  { label: "Claude", href: "https://claude.ai/" },
  { label: "Cursor", href: "https://www.cursor.com/" },
  { label: "VS Code", href: "https://code.visualstudio.com/" },
  { label: "GitHub", href: "https://github.com/" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-16">
      {/* 頁面標題列：左標題、右大頭照 */}
      <header className="mb-12 flex items-end justify-between gap-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          About
        </h1>
        <Image
          src="/images/headshot.png"
          alt={`Portrait of ${site.name}`}
          width={96}
          height={96}
          // ring-1 ring-line：照片邊緣加一圈細framing，疊在玻璃場景上更立體
          className="rounded-full bg-line ring-1 ring-line"
          priority // 首屏圖片優先載入
        />
      </header>

      {/* ---------- 自我介紹（直接放在光暈背景上，不加玻璃，保持輕盈） ---------- */}
      <section className="space-y-5 text-base leading-relaxed sm:text-lg">
        <p>
          I&apos;m Abel — a designer and consultant based in {site.location},
          working across product design, customer experience, and strategy. My
          work is about delivering experiences that hold up across the whole
          customer journey, for people in very different contexts around the
          world.
        </p>
        <p>
          My path here wasn&apos;t linear. I studied political science, then
          psychology and user experience. That mix taught me to read systems
          and people before pixels — and it&apos;s why I gravitate toward
          problems where human understanding matters as much as technology. I
          believe meaningful solutions emerge at the confluence of the two, and
          most often at the intersection of disciplines.
        </p>
        {/* 中文點綴句 */}
        <p className="font-tc text-sm leading-loose tracking-wide text-muted">
          瘋狂的急迫感推動我前進，持續探索成為跨領域通才。
        </p>
      </section>

      {/* ---------- 工具區：玻璃面板＋玻璃膠囊（chip） ---------- */}
      <section className="glass mt-12 rounded-3xl p-6 sm:p-8">
        <h2 className="mb-2 text-2xl font-medium tracking-tight">
          Tools I think with
        </h2>
        <p className="mb-6 text-sm text-muted">
          Software I use to accelerate thinking and carry out the work.
        </p>
        <ul className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <li key={tool.label}>
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-block rounded-full px-4 py-1.5 text-sm transition-colors hover:text-accent"
              >
                {tool.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- 聯絡方式（只放 Email，不放電話），玻璃面板 ---------- */}
      <section className="glass mt-6 rounded-3xl p-6 sm:p-8">
        <h2 className="mb-6 text-2xl font-medium tracking-tight">Contact</h2>
        {/* dl/dt/dd = 「名稱：值」的語意化標籤，例如「Email: xxx」 */}
        <dl className="space-y-3 text-base">
          <div className="flex gap-4">
            <dt className="w-20 shrink-0 text-sm text-muted">Based in</dt>
            <dd>{site.location}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-20 shrink-0 text-sm text-muted">Email</dt>
            <dd>
              <a
                href={`mailto:${site.email}`}
                className="underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {site.email}
              </a>
            </dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-20 shrink-0 text-sm text-muted">Elsewhere</dt>
            <dd className="flex flex-wrap gap-4">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {s.label}
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
