// ============================================================
// Photography 頁：照片直列展示，每張裝在玻璃相框裡。
// 新增照片步驟：1) 把檔案放進 public/photos/
//              2) 在下面的 photos 陣列加一筆
// ============================================================
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Photography",
  description: "Moments collected along the way.",
};

// 照片清單（alt 是給螢幕報讀器與搜尋引擎的文字描述，
// 之後可以換成每張照片各自的描述，例如拍攝地點）
const photos = [
  { src: "/photos/photo1.jpg", alt: "Photograph by Xuan-Chen Hu" },
  { src: "/photos/photo2.jpg", alt: "Photograph by Xuan-Chen Hu" },
  { src: "/photos/photo3.jpg", alt: "Photograph by Xuan-Chen Hu" },
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

      {/* 照片由上往下排列；外層 glass + p-2 做出「玻璃相框」的細邊 */}
      <div className="flex flex-col gap-10">
        {photos.map((photo, i) => (
          <figure key={photo.src} className="glass rounded-3xl p-2">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={1800}  // 原始檔的尺寸，瀏覽器據此預留空間、避免載入時版面跳動
              height={1197}
              sizes="(min-width: 768px) 768px, 100vw" // 告訴瀏覽器實際顯示寬度，下載剛好大小的圖
              className="w-full rounded-2xl bg-line"
              priority={i === 0} // 只有第一張優先載入（它在首屏）
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
