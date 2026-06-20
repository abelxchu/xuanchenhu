// ============================================================
// About 區段（單頁版）：自我介紹敘事＋常用工具。
// 由原本的 app/about/page.tsx 改寫——拿掉獨立頁的 metadata、大頭照
// （首屏名片已有頭像，避免重複）與聯絡面板（移到 Contact 區段）。
// 區段 id="about" 供導覽列錨點捲動。
// ============================================================

// 工具清單：自訂排列順序；不分性質深淺，全部統一用同一種樣式（描邊膠囊）。
// 刻意只放文字、不抓各家網站的 favicon（外部圖示常失效又拖慢載入）。
const tools: { label: string; href: string }[] = [
  { label: "VS Code", href: "https://code.visualstudio.com/" },
  { label: "Notion", href: "https://www.notion.so/" },
  { label: "Adobe Creative Cloud", href: "https://www.adobe.com/creativecloud.html" },
  { label: "Figma", href: "https://www.figma.com/" },
  { label: "ChatGPT", href: "https://chatgpt.com/" },
  { label: "Perplexity", href: "https://www.perplexity.ai/" },
  { label: "Heptabase", href: "https://heptabase.com/" },
  { label: "Cursor", href: "https://www.cursor.com/" },
  { label: "Claude", href: "https://claude.ai/" },
  { label: "GitHub", href: "https://github.com/" },
];

// 信奉的原則：簡短說明放在引用者後面
const principles: { title: string; attribution: string; description: string }[] = [
  {
    title: "Think Different",
    attribution: "Steve Jobs",
    description:
      "Question the status quo and look at problems from a fresh angle, even when convention says otherwise.",
  },
  {
    title: "First-principles",
    attribution: "Elon Musk",
    description:
      "Break things down to their fundamental truths and reason up from there, instead of relying on analogy.",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-3xl scroll-mt-28 px-5 py-24 sm:py-28"
    >
      <h2 className="reveal mb-12 text-4xl font-semibold tracking-tight sm:text-5xl">
        About
      </h2>

      {/* ---------- 自我介紹（直接放在光暈背景上，不加玻璃，保持輕盈） ---------- */}
      <div className="reveal space-y-5 text-base leading-relaxed sm:text-lg">
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
      </div>

      {/* ---------- 工具區：玻璃面板＋玻璃膠囊（chip） ---------- */}
      <div className="glass reveal mt-12 rounded-3xl p-6 sm:p-8">
        <h3 className="mb-2 text-2xl font-medium tracking-tight">
          Tools I think with
        </h3>
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
                className="inline-block rounded-full border border-line px-4 py-1.5 text-sm transition-colors hover:text-accent"
              >
                {tool.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- 原則區：信奉的兩條原則＋簡短說明 ---------- */}
      <div className="glass reveal mt-6 rounded-3xl p-6 sm:p-8">
        <h3 className="mb-2 text-2xl font-medium tracking-tight">
          Principles I believe in
        </h3>
        <p className="mb-6 text-sm text-muted">
          Two ideas that shape how I approach problems and decisions.
        </p>
        <dl className="grid gap-6 sm:grid-cols-2">
          {principles.map((principle) => (
            <div key={principle.title}>
              <dt className="font-medium">
                {principle.title}{" "}
                <span className="text-sm text-muted">
                  &mdash; {principle.attribution}
                </span>
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">
                {principle.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
