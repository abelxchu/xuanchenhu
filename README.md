# xuanchenhu — Personal Site

Next.js 16 + Tailwind CSS v4 重建的個人網站（取代原本的純 HTML 版本）。

## 開發

```bash
npm run dev      # http://localhost:3000
npm run build    # 靜態輸出到 out/
```

## 結構

- `lib/site.ts` — 全站設定（名字、Email、社群連結、GA ID、網域）。**改個人資訊只需改這裡。**
- `app/layout.tsx` — 共用 layout（header/footer/字體/SEO meta/GA/主題初始化）
- `app/*/page.tsx` — 各頁面內容
- `components/` — Header、Footer、ThemeToggle、Seal（朱紅印章）
- `app/globals.css` — 設計 token（色彩、字體變數，含暗色模式）

## 部署

`next.config.ts` 設定為靜態輸出（`output: "export"`），`npm run build` 後把 `out/` 部署到任何靜態主機即可。

- **GitHub Pages（專案子路徑）**：取消 `next.config.ts` 裡 `basePath` 的註解
- **Vercel**：可移除 `output: "export"` 與 `images.unoptimized` 啟用圖片自動最佳化
- 部署後記得把 `lib/site.ts` 的 `url` 換成實際網域（影響 OG 與 sitemap）

## 待辦

- [ ] Portfolio 頁補上可公開的 case study（結構已預留在 `app/portfolio/page.tsx` 註解）
- [ ] Photography 換上更多照片（放進 `public/photos/`，並更新 `app/photography/page.tsx` 的清單）
