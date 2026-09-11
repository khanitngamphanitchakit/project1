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
      <body>{children}</body>
    </html>
  );
}
