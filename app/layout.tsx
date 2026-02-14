import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALMA - 갱년기, 혼자 겪지 마세요",
  description: "3분 체크인으로 나의 갱년기 단계를 확인하고, 비슷한 여성들과 연결되세요. 850만 갱년기 여성을 위한 안전한 커뮤니티.",
  keywords: ["갱년기", "폐경", "여성건강", "갱년기증상", "갱년기커뮤니티", "ALMA"],
  openGraph: {
    title: "ALMA - 갱년기, 혼자 겪지 마세요",
    description: "3분 체크인으로 나의 갱년기 단계를 확인하고, 비슷한 여성들과 연결되세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "ALMA",
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
        {children}
      </body>
    </html>
  );
}
