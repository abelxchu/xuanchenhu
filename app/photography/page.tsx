// ============================================================
// Photography 頁：卡堆攤開的照片牆（互動在 components/photo-stack.tsx）。
// 新增照片步驟：1) 把檔案放進 public/photos/
//              2) 在下面的 photos 陣列加一筆（少量精選，3–8 張最合適）
// ============================================================
import type { Metadata } from "next";
import { basePath } from "@/lib/site";
import { PhotoCoverflow } from "@/components/photo-coverflow";

export const metadata: Metadata = {
  title: "Photography",
  description: "Moments collected along the way.",
};

// 照片清單（alt 是給螢幕報讀器與搜尋引擎的文字描述，
// 之後可以換成每張照片各自的描述，例如拍攝地點）
const photos = [
  { src: `${basePath}/photos/photo1.jpg`, alt: "Photograph by Xuan-Chen Hu" },
  { src: `${basePath}/photos/photo2.jpg`, alt: "Photograph by Xuan-Chen Hu" },
  { src: `${basePath}/photos/photo3.jpg`, alt: "Photograph by Xuan-Chen Hu" },
];

export default function PhotographyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-16">
      <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Photography
      </h1>
      <p className="mb-12 text-base leading-relaxed text-muted sm:text-lg">
        Moments collected along the way. More on{" "}
        <a
          href="https://www.instagram.com/abelxchu/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          Instagram @abelxchu
        </a>
        .
      </p>

      {/* Coverflow：中央大圖、兩側傾斜，點側圖／箭頭／圓點切換 */}
      <PhotoCoverflow photos={photos} />
    </div>
  );
}
