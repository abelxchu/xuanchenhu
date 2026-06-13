// ============================================================
// 全站設定檔：個人資訊、社群連結、SEO 文案都集中在這裡。
// 想改 Email、職稱、社群帳號，只需要改這個檔案，全站自動更新。
// ============================================================

export const site = {
  name: "Xuan-Chen Hu",          // 英文全名（頁尾版權、SEO 用）
  shortName: "XUAN CHEN HU",     // 左上角的字標（wordmark）
  chineseName: "胡軒塵",          // 中文名（印章元件用）
  role: "Designer & Consultant", // 職稱
  title: "Xuan-Chen Hu — Designer & Consultant", // 瀏覽器分頁標題、分享預覽標題
  description:
    "Designer and consultant in Taipei, working at the crossroads of humanity and technology — product design, customer experience, and strategy.",
  // TODO: 部署後換成實際網域（影響社群分享預覽的連結與 sitemap）
  url: "https://xuanchenhu.com",
  email: "abelhu.tw@gmail.com",
  location: "Taipei, Taiwan",
  gaId: "G-HGR5WFET0D",          // Google Analytics 追蹤 ID
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/xuanchenhu" },
    { label: "Medium", href: "https://medium.com/@xuanchenhu" },
    { label: "Instagram", href: "https://www.instagram.com/togeneralist" },
  ],
} as const;

// 導航選單的項目與順序。新增頁面時在這裡加一筆，
// header 選單、首頁索引列表、sitemap 都會自動帶到。
export const nav = [
  { label: "Work", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Photography", href: "/photography" },
] as const;
