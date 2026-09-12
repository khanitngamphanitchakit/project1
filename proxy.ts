import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Next.js 16 ใช้ชื่อ proxy.ts แทน middleware.ts
// และต้อง export เป็นฟังก์ชันตรง ๆ (default หรือชื่อ "proxy")
// เขียนแบบ `export const { auth: proxy } = NextAuth(...)` จะ build ไม่ผ่าน
// ใช้ authConfig ตัวเบา (ไม่มี Prisma) เพราะไฟล์นี้รันก่อนทุก request
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  // รันกับทุกหน้า ยกเว้นไฟล์ static และ API
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
