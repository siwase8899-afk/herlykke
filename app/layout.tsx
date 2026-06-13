import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "HERLYKKE - 수면과 마음의 전환기를 혼자 견디지 않도록",
  description: "수면과 마음의 안정을 원하는 사람을 위한 웰니스 체크인과 커뮤니티. 수면, 열감, 감정 변화를 조용히 기록하고 비슷한 경험의 이야기를 만나보세요.",
  keywords: ["몸과 마음의 변화", "수면변화", "열감", "감정기복", "브레인포그", "수면웰니스", "HERLYKKE", "헤르리케", "웰니스커뮤니티"],
  openGraph: {
    title: "HERLYKKE - 수면과 마음의 전환기를 혼자 견디지 않도록",
    description: "수면, 열감, 감정 변화를 조용히 확인하는 1분 체크인과 커뮤니티.",
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
      <body className={`${fraunces.variable} antialiased`}>
        <LayoutShell>{children}</LayoutShell>
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
