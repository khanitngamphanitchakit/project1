import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/auth.config";

// รูปแบบข้อมูลที่ยอมรับจากฟอร์ม
const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // ฟังก์ชันหลัก: รับ email/password แล้วตอบว่าเป็นใคร (หรือ null ถ้าไม่ผ่าน)
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // 1. ค้นผู้ใช้จากฐานข้อมูล
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        // 2. เทียบรหัสผ่านที่กรอกกับ hash ในฐานข้อมูล
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) return null;

        // 3. คืนข้อมูลที่จะเก็บใน session (ห้ามคืน password)
        return { id: String(user.id), email: user.email, name: user.name };
      },
    }),
  ],
});
