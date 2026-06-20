// ============================================================
// 全站設定檔：個人資訊、社群連結、SEO 文案都集中在這裡。
// 想改 Email、職稱、社群帳號，只需要改這個檔案，全站自動更新。
// ============================================================

export const site = {
  name: "Xuan-Chen Hu",          // 英文全名（頁尾版權、SEO 用）
  shortName: "XUAN CHEN HU",     // 左上角的字標（wordmark）
  motto: "keep exploring",       // 開場動畫字標下的座右銘（小寫、簡短）
  chineseName: "胡軒塵",          // 中文名（印章元件用）
  role: "Consultant",            // 名片主職稱
  roleSub: ["Business Strategy", "Customer Experience"], // 名片副標（兩行）：ToB＋ToC 雙軸
  title: "Xuan-Chen Hu — Consultant", // 瀏覽器分頁標題、分享預覽標題
  description:
    "Consultant in Taipei working across business strategy and customer experience — bridging ToB commercial strategy and ToC user research, rooted in social science.",
  // 線上實際網址（GitHub Pages 子路徑）；影響 OG 連結、sitemap、canonical
  url: "https://abelxchu.github.io/xuanchenhu",
  email: "abelhu.tw@gmail.com",
  location: "Taipei, Taiwan",
  gaId: "G-HGR5WFET0D",          // Google Analytics 追蹤 ID
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/xuanchenhu/" },
    { label: "Medium", href: "https://medium.com/@xuanchenhu" },
    { label: "Threads", href: "https://www.threads.com/@abelxchu" },
  ],
} as const;

// 導航選單的項目與順序。新增頁面時在這裡加一筆，
// header 選單、首頁索引列表、sitemap 都會自動帶到。
export const nav = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/portfolio" },
  { label: "Photography", href: "/photography" },
] as const;

// 部署在 GitHub Pages 子路徑時，public 圖片要手動加這個前綴
// （next/image 的 unoptimized 模式不會自動補 basePath；next/link 則會自動補）。
export const basePath =
  process.env.NODE_ENV === "production" ? "/xuanchenhu" : "";
