// ============================================================
// 自動產生 sitemap.xml（給搜尋引擎看的頁面清單）。
// 單頁站：只有首頁一個網址（導覽列各項是頁內錨點，不算獨立頁面）。
// ============================================================
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// 靜態輸出模式（output: "export"）要求明確標示這個檔案在 build 時產生
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // site.url 已含子路徑；trailingSlash: true，故補尾斜線。
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
    },
  ];
}
