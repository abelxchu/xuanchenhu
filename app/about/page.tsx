// ============================================================
// About 頁：自我介紹＋常用工具＋聯絡方式。
// 玻璃風版本：工具與聯絡資訊各裝在一塊玻璃面板裡。
// ============================================================
import type { Metadata } from "next";
import Image from "next/image";
import { site, basePath } from "@/lib/site";

// 這一頁專屬的 SEO 標題與描述（標題會變成「About — Xuan-Chen Hu」）
export const metadata: Metadata = {
  title: "About",
  description:
    "Designer and consultant in Taipei. Political science, psychology, and UX — synthesized into product and customer experience work.",
};

// 工具清單：自訂排列順序；group 決定底色的灰階深淺（不用色相）。
//   think（思考／知識／AI）最實 → design（設計）中 → build（開發）最淺。
// 刻意只放文字、不抓各家網站的 favicon（外部圖示常失效又拖慢載入）。
const tools: {
  label: string;
  href: string;
  group: "think" | "design" | "build";
}[] = [
  { label: "VS Code", href: "https://code.visualstudio.com/", group: "build" },
  { label: "Notion", href: "https://www.notion.so/", group: "think" },
  { label: "Adobe Creative Cloud", href: "https://www.adobe.com/creativecloud.html", group: "design" },
  { label: "Figma", href: "https://www.figma.com/", group: "design" },
  { label: "ChatGPT", href: "https://chatgpt.com/", group: "think" },
  { label: "Perplexity", href: "https://www.perplexity.ai/", group: "think" },
  { label: "Heptabase", href: "https://heptabase.com/", group: "think" },
  { label: "Cursor", href: "https://www.cursor.com/", group: "build" },
  { label: "Claude", href: "https://claude.ai/", group: "think" },
  { label: "GitHub", href: "https://github.com/", group: "build" },
];

// 三個灰階深淺等級，對應工具性質——靠底色深淺分類，不引入色相
const groupStyle: Record<"think" | "design" | "build", string> = {
  think: "bg-[var(--chip-think)]", // 最實
  design: "bg-[var(--chip-design)]", // 中
  build: "border border-line", // 最淺（僅描邊）
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-16">
      {/* 頁面標題列：左標題、右大頭照 */}
      <header className="mb-12 flex items-end justify-between gap-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          About
        </h1>
        <Image
          src={`${basePath}/images/headshot.png`}
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
        <p>I&apos;m Abel.</p>
        <p>
          I studied political science, which sparked my interest in how people,
          systems, and incentives shape decisions. That perspective continues to
          influence how I think and work today.
        </p>
        <p>
          My career has taken me across customer experience, product, and
          business strategy. Together, these experiences have reinforced my
          belief that meaningful solutions often emerge from connecting human
          needs, technology, and ideas across disciplines.
        </p>
        <p>
          I&apos;m driven by curiosity and a habit of asking &ldquo;why.&rdquo;
          First-principles thinking helps me break complex problems into their
          fundamental parts, challenge assumptions, and build understanding from
          the ground up.
        </p>
        <p>
          This mindset has led me to explore new fields and continuously broaden
          how I understand the world&mdash;connecting insights across technology,
          business, and human behavior to make sense of complex problems and
          uncover new opportunities.
        </p>
        {/* 中文點綴句 */}
        <p className="font-tc text-sm leading-loose tracking-wide text-muted">
          站在人文與科技的交會口，建構一個更加人性化的世界。
        </p>
      </section>

      {/* ---------- 工具區：玻璃面板＋玻璃膠囊（chip） ---------- */}
      <section className="glass mt-12 rounded-3xl p-6 sm:p-8">
        <h2 className="mb-2 text-2xl font-medium tracking-tight">
          Tools I think with
        </h2>
        <p className="mb-6 text-sm text-muted">
          Software and tools I use to accelerate thinking, fulfil my work and
          vision.
        </p>
        <ul className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <li key={tool.label}>
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block rounded-full px-4 py-1.5 text-sm transition-colors hover:text-accent ${groupStyle[tool.group]}`}
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
