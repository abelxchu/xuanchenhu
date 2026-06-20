// ============================================================
// 自動產生 sitemap.xml（給搜尋引擎看的頁面清單）。
// 頁面清單來自 lib/site.ts 的 nav，新增頁面時不用動這個檔案。
// ============================================================
import type { MetadataRoute } from "next";
import { site, nav } from "@/lib/site";

// 靜態輸出模式（output: "export"）要求明確標示這個檔案在 build 時產生
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // 首頁＋導航裡的每一頁。site.url 已含子路徑，所以用字串拼接：
  // new URL("/about", base) 會把 "/about" 當域根、丟掉 /xuanchenhu 子路徑。
  // trailingSlash: true，故每個網址補尾斜線。
  return ["", ...nav.map((n) => n.href)].map((path) => ({
    url: `${site.url}${path}/`,
    lastModified: new Date(),
  }));
}
