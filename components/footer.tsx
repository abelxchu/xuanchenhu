// ============================================================
// 頁尾（單頁版）：只留版權聲明——Email／社群已在 Contact 區段呈現，
// 不重複。年份自動帶當年，不用每年手改。
// ============================================================
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-5xl px-5 py-8 text-center">
        <p className="text-xs tracking-wider text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
