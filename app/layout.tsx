// ============================================================
// 全站共用的外框（layout）：每一頁都會套用這裡的
// 字體、SEO 設定、Header、Footer、Google Analytics、主題初始化。
// ============================================================

import type { Metadata } from "next";
import { Inter, Noto_Serif_TC } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import "./globals.css";

// ---------- 字體：由 Next.js 自動下載並託管，不再連 Google Fonts ----------
// 液態玻璃風格全站使用無襯線（Inter，氣質貼近 Apple 的 SF Pro）；
// Noto Serif TC 保留給中文點綴與印章。
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-noto-serif-tc",
  preload: false, // 中文字體檔很大，不預載，用到的字才下載
});

// ---------- SEO：瀏覽器分頁標題、搜尋結果描述、社群分享預覽 ----------
export const metadata: Metadata = {
  metadataBase: new URL(site.url), // OG 連結的基準網域（部署後記得改 lib/site.ts）
  title: {
    default: site.title,
    template: `%s — ${site.name}`, // 子頁面標題格式，例如「About — Xuan-Chen Hu」
  },
  description: site.description,
  openGraph: {
    // 分享到 LinkedIn / Facebook 等平台時顯示的資訊
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
  },
};

// 這段腳本會在頁面繪製前執行：讀 localStorage 裡存的主題偏好
// （沒存過就跟隨系統設定），需要暗色就先掛上 .dark class。
// 目的是避免暗色模式使用者進站時「先閃一下白底再變黑」。
const themeInit = `(function(){try{var t=localStorage.theme;if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`;

export default function RootLayout({
  children, // children = 各頁面的內容，會塞進下面的 <main> 裡
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning：因為主題腳本會在 React 接手前改 <html> 的 class，
    // 這行告訴 React 不要對這個差異報錯
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSerifTC.variable} flex min-h-svh flex-col font-sans`}
        // min-h-svh + flex-col：讓頁面至少滿版高，footer 自然貼底
      >
        {/* 主題初始化腳本，必須放在最前面、比畫面先執行 */}
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <Header />
        {/* flex flex-col 讓頁面內容可用 flex-1 填滿、垂直置中（首頁名片用到）；
            flex-1 撐開剩餘高度把 footer 推到底；
            pt-24 是留給懸浮玻璃導航列的空間（它是 fixed，不佔版面） */}
        <main className="flex flex-1 flex-col pt-24">{children}</main>
        <Footer />
        {/* ---------- Google Analytics（afterInteractive = 頁面互動後才載入，不拖慢首屏） ---------- */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.gaId}');`}
        </Script>
      </body>
    </html>
  );
}
