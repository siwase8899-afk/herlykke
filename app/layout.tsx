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
  title: "HERLYKKE - 잠을 되찾는 여정, 혼자 걷지 않아도 됩니다",
  description: "4050 여성을 위한 수면 커뮤니티. 먼저 겪은 메이트들의 Real Ink 수면 레시피로 오늘 밤을 바꿔보세요. 1분 체크인으로 내 수면 유형을 파악하고 맞춤 레시피를 받아보세요.",
  keywords: ["갱년기수면", "불면증", "수면레시피", "여성수면", "갱년기", "열감수면", "새벽각성", "HERLYKKE", "헤르리케", "수면커뮤니티", "뇌건강"],
  openGraph: {
    title: "HERLYKKE - 잠을 되찾는 여정, 혼자 걷지 않아도 됩니다",
    description: "먼저 겪은 메이트들의 Real Ink 수면 레시피. 커뮤니티가 검증한 방법만 모았어요.",
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
