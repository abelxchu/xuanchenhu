// ============================================================
// 404 頁：與全站一致的玻璃風（取代 Next 預設的陽春樣）。
// ============================================================
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <div className="glass rounded-3xl px-10 py-14">
        <p className="text-6xl font-semibold tracking-tight sm:text-7xl">404</p>
        <p className="mt-4 text-lg text-muted">
          This page drifted off somewhere.
        </p>
        <Link
          href="/"
          className="glass-tint mt-8 inline-block rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
