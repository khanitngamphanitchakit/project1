import type { NextAuthConfig } from "next-auth";

// ส่วนตั้งค่าที่ "เบา" ไม่แตะฐานข้อมูล ใช้ร่วมกันระหว่าง auth.ts และ proxy.ts
export const authConfig = {
  pages: {
    signIn: "/login", // ถ้ายังไม่ล็อกอิน ให้ส่งไปหน้านี้
  },
  session: {
    strategy: "jwt", // เก็บ session ใน cookie แบบเซ็นลายเซ็น ไม่ต้องมีตาราง session
  },
  callbacks: {
    // ถูกเรียกทุก request ที่ผ่าน proxy.ts เพื่อตัดสินว่าให้เข้าไหม
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const path = request.nextUrl.pathname;

      // หน้าที่ต้องล็อกอินก่อน
      if (path.startsWith("/dashboard") || path.startsWith("/admin")) {
        return isLoggedIn; // false = ส่งไปหน้า /login อัตโนมัติ
      }

      // ล็อกอินแล้วแต่เข้าหน้า login อีก ให้เด้งไป dashboard
      if (path.startsWith("/login") && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      return true; // หน้าอื่นเข้าได้หมด
    },
  },
  providers: [], // ใส่จริงใน auth.ts
} satisfies NextAuthConfig;
