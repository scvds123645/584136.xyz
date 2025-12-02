import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FB老号商城 - 30天+满月白号·稳定耐用·Cookie直登",
  description: "FB 30天+老白号，Cookie直登，首登保活。工作室一手货源，¥2/个，支持指纹浏览器，业务推广首选。",
  keywords: "Facebook老号,FB白号,满月号,Cookie直登,指纹浏览器,社交媒体账号",
  openGraph: {
    title: "FB老号商城 - 30天+满月白号",
    description: "工作室一手货源，稳定耐用，Cookie直登",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}