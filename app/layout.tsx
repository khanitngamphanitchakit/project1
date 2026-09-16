import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "Order by Khanit",
  description: "ระบบติดตามออเดอร์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={prompt.variable}>
      <head>
        {/*
          กู้คืนมุมมองที่ผู้ใช้เลือก (เดสก์ท็อป/มือถือ) ก่อนเบราว์เซอร์วาดหน้าจอ
          ถ้ารอ useEffect เลย์เอาต์จะกระพริบจากเดสก์ท็อปเป็นมือถือให้เห็น
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.view=localStorage.getItem("khanit-view")==="mobile"?"mobile":"desktop"}catch(e){document.documentElement.dataset.view="desktop"}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
