import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";

export const metadata: Metadata = {
  title: "HERLYKKE - 두번째 봄, 혼자 지나지 마세요",
  description: "당신의 변화를 이해하는 곳에서, 같은 경험의 동료를 만나세요. 3분 체크인으로 나의 변화 단계를 확인하고, 비슷한 여성들과 연결되세요.",
  keywords: ["갱년기", "폐경", "여성건강", "갱년기증상", "갱년기커뮤니티", "HERLYKKE", "헤르리케", "관절통", "불면", "감정기복", "갱년기자가진단", "두번째봄"],
  openGraph: {
    title: "HERLYKKE - 두번째 봄, 혼자 지나지 마세요",
    description: "당신의 변화를 이해하는 곳에서, 같은 경험의 동료를 만나세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "HERLYKKE",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">
        <LayoutShell>{children}</LayoutShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
