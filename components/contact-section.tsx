// ============================================================
// Contact 區段（單頁版收尾）：所在地、Email、社群，以及索取作品集 CTA。
// 整合了原 About 頁的聯絡面板與原 Work 頁結尾的 Request the portfolio。
// 區段 id="contact" 供導覽列錨點捲動。
// ============================================================
import { site } from "@/lib/site";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-3xl scroll-mt-28 px-5 py-24 sm:py-28"
    >
      <h2 className="reveal mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Let&apos;s talk
      </h2>
      <p className="reveal mb-12 max-w-xl text-base leading-relaxed text-muted">
        Open to conversations, collaborations, and good questions.
      </p>

      {/* 聯絡資訊面板 */}
      <div className="glass reveal rounded-3xl p-6 sm:p-8">
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
      </div>

      {/* 索取作品集 CTA（原 Work 頁結尾搬來） */}
      <div className="reveal mt-8 flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${site.email}?subject=Portfolio%20request`}
          className="glass-tint rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
        >
          Request the portfolio
        </a>
        <span className="text-sm text-muted">
          Selected portfolio available on request.
        </span>
      </div>
    </section>
  );
}
