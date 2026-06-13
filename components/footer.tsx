// ============================================================
// 頁尾：版權聲明＋Email＋社群連結。年份自動帶當年，不用每年手改。
// ============================================================
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      {/* 手機版直排（flex-col）、平板以上左右分開（sm:flex-row + justify-between） */}
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs tracking-wider text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${site.email}`}
            className="text-xs text-muted transition-colors hover:text-accent"
          >
            Email
          </a>
          {/* 社群連結從 lib/site.ts 讀，那邊改了這裡自動更新 */}
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted transition-colors hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
