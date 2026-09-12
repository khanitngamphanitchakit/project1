"use client";

import Link from "next/link";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { UserIcon } from "../icons";

export default function ProfilePage() {
  return (
    <div className="app-shell">
      <Header />

      <div className="page-heading-row">
        <h1>โปรไฟล์</h1>
      </div>

      <main className="app-main">
        <section className="page-content">
          <div className="profile-card">
            <span className="profile-avatar" aria-hidden="true">
              <UserIcon className="profile-avatar-icon" />
            </span>

            <h2>ผู้ใช้ทั่วไป</h2>
            <p>
              ยังไม่ได้เข้าสู่ระบบ — ขณะนี้ระบบยังติดตามออเดอร์แบบไม่ต้องล็อกอิน
              เข้าสู่ระบบเพื่อบันทึกออเดอร์ไว้ดูภายหลังได้ในเวอร์ชันถัดไป
            </p>

            <Link href="/orders" className="primary-button state-button">
              ดูออเดอร์ทั้งหมด
            </Link>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
