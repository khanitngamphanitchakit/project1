import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

// ผู้ใช้ทดสอบ (เปลี่ยนได้ตามต้องการ)
const TEST_USER = {
  email: "test@example.com",
  password: "password123",
  name: "ผู้ใช้ทดสอบ",
};

async function main() {
  // 1. แปลงรหัสผ่านเป็น hash (10 = ความยากในการคำนวณ ค่ามาตรฐาน)
  const hashedPassword = await bcrypt.hash(TEST_USER.password, 10);

  // 2. upsert = ถ้ามี email นี้แล้วให้ข้าม ถ้ายังไม่มีให้สร้าง (รันซ้ำได้ไม่พัง)
  const user = await prisma.user.upsert({
    where: { email: TEST_USER.email },
    update: {},
    create: {
      email: TEST_USER.email,
      password: hashedPassword,
      name: TEST_USER.name,
    },
  });

  console.log("สร้างผู้ใช้ทดสอบแล้ว:", user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
