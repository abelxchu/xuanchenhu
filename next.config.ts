import type { NextConfig } from "next";

// 部署在 GitHub Pages 子路徑 abelxchu.github.io/xuanchenhu/，
// 所以 production build（Actions 上）要加 basePath，資源路徑才會對；
// 本機 dev（npm run dev）不加，維持根路徑方便開發。
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // 靜態輸出：build 後的 out/ 可直接部署到 GitHub Pages 或任何靜態主機。
  // 若改部署到 Vercel，可移除 output 與 images.unoptimized 以啟用圖片最佳化。
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isProd ? "/xuanchenhu" : "",
};

export default nextConfig;
