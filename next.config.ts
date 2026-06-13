import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 靜態輸出：build 後的 out/ 可直接部署到 GitHub Pages 或任何靜態主機。
  // 若改部署到 Vercel，可移除 output 與 images.unoptimized 以啟用圖片最佳化。
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // 若部署在 GitHub Pages 的專案子路徑（如 username.github.io/xuanchenhu），
  // 取消下行註解：
  // basePath: "/xuanchenhu",
};

export default nextConfig;
