// ============================================================
// 社群分享預覽圖（Open Graph image），build 時用 ImageResponse 生成 1200×630 PNG。
// 分享到 LinkedIn／Threads／訊息時顯示的預覽大圖。
// 註：ImageResponse 不內建中文字體，所以圖上用英文（避免中文變方塊）。
// ============================================================
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// 靜態輸出模式（output: "export"）要求明示這張圖在 build 時產生
export const dynamic = "force-static";

export const alt = "Xuan-Chen Hu — Consultant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background:
            "linear-gradient(135deg, #1b1714 0%, #14110d 55%, #1e1424 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            color: "#e0532f",
            marginBottom: 28,
          }}
        >
          {site.shortName}
        </div>
        <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>
          Consultant
        </div>
        <div style={{ fontSize: 40, color: "#c9c1b4", marginTop: 24 }}>
          Business Strategy &amp; Customer Experience
        </div>
        <div style={{ fontSize: 24, color: "#75695a", marginTop: 56 }}>
          abelxchu.github.io/xuanchenhu
        </div>
      </div>
    ),
    { ...size },
  );
}
