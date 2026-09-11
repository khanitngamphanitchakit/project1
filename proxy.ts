import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Next.js 16 ใช้ชื่อ proxy.ts แทน middleware.ts
// ใช้ authConfig ตัวเบา (ไม่มี Prisma) เพราะไฟล์นี้รันก่อนทุก request
export const { auth: proxy } = NextAuth(authConfig);

export const config = {
  // รันกับทุกหน้า ยกเว้นไฟล์ static และ API
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
