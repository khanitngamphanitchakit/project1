"use client";

import { useRouter } from "next/navigation";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { ChevronLeftIcon, UserIcon } from "../components/icons";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <main className="app-shell">
      <Header />

      <div className="page-heading-row">
        <button
          type="button"
          className="back-button"
          aria-label="กลับหน้าแรก"
          onClick={() => router.push("/")}
        >
          <ChevronLeftIcon className="back-icon" />
        </button>
        <h1>โปรไฟล์</h1>
      </div>

      <section className="page-content">
        <div className="profile-card">
          <span className="profile-avatar" aria-hidden="true">
            <UserIcon className="profile-avatar-icon" />
          </span>
          <h2>ยังไม่ได้เข้าสู่ระบบ</h2>
          <p>
            เข้าสู่ระบบเพื่อบันทึกประวัติการสั่งซื้อและติดตามออเดอร์ได้สะดวกยิ่งขึ้น
          </p>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
