import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const brandSerif = Noto_Serif_KR({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "VISE - 수도권 연합 바이브코딩 소모임",
  description: "VISE 소모임원 활동 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} ${brandSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
