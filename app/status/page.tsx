"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function StatusPage() {
  const router = useRouter();
  const [orderNo, setOrderNo] = useState("ORD - 28587965432159");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const order = params.get("order");

    if (order) {
      setOrderNo(order);
    }
  }, []);

  return (
    <main className="app-shell">
      <Header />

      <section className="page-content status-page">
        <div className="tracking-card">
          <h1>ติดตามออเดอร์</h1>

          <label>กรอกหมายเลข Order</label>

          <div className="search-row">
            <input value={orderNo} readOnly />
            <span className="search-button">⌕</span>
          </div>

          <p className="format-help">เช่น ORD - 28587965432159</p>
        </div>

        <div className="status-line">
          <div className="status-step done">
            <span>อยู่ในคิว</span>
          </div>

          <div className="status-arrow">›</div>

          <div className="status-step done">
            <span>กำลังดำเนินการ</span>
          </div>

          <div className="status-arrow">›</div>

          <div className="status-step">
            <span>เสร็จสิ้น</span>
          </div>

          <div className="status-arrow">›</div>

          <div className="status-step waiting">
            <span>รอชำระเงิน</span>
          </div>
        </div>

        <p className="waiting-text">โปรดรอสักครู่......</p>

        <button
          type="button"
          className="red-button back-button"
          onClick={() => router.push("/")}
        >
          กลับหน้าแรก
        </button>
      </section>

      <BottomNav />
    </main>
  );
}
