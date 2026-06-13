// ============================================================
// 自動產生 robots.txt（告訴搜尋引擎爬蟲：全站開放索引，
// 並附上 sitemap 的位置）。
// ============================================================
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// 靜態輸出模式（output: "export"）要求明確標示這個檔案在 build 時產生
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" }, // 所有爬蟲、所有頁面都可以爬
    sitemap: new URL("/sitemap.xml", site.url).href,
  };
}
