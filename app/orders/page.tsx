"use client";

import { useRouter } from "next/navigation";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function OrdersPage() {
  const router = useRouter();

  const orderNo = "ORD - 28587965432159";

  return (
    <main className="app-shell">
      <Header />

      <section className="page-content orders-page">
        <div className="order-tabs">
          <button type="button" className="order-tab active">
            ออเดอร์ปัจจุบัน
          </button>

          <button type="button" className="order-tab">
            ออเดอร์ที่ผ่านมา
          </button>
        </div>

        <div className="order-card">
          <div className="order-number">รหัส Order : {orderNo}</div>

          <button
            type="button"
            className="copy-button"
            onClick={() => {
              navigator.clipboard?.writeText(orderNo);
            }}
          >
            Copy
          </button>

          <h2>สถานะ : รอชำระเงิน</h2>

          <div className="product-row">
            <span>xxxxxxx</span>
            <strong>100</strong>
            <span>▣</span>
          </div>

          <div className="product-row">
            <span>xxxxxxx</span>
            <strong>100</strong>
            <span>▣</span>
          </div>

          <div className="product-row">
            <span>xxxxxxx</span>
            <strong>100</strong>
            <span>▣</span>
          </div>

          <div className="product-row">
            <span>xxxxxxx</span>
            <strong>189</strong>
            <span>▣</span>
          </div>

          <div className="total-row">
            <strong>รวม</strong>
            <strong>489 บาท</strong>
          </div>

          <p className="order-date">
            วันที่และเวลาที่ทำรายการ 21/08/2026 : 15:42 น.
          </p>
        </div>

        <button
          type="button"
          className="red-button continue-button"
          onClick={() =>
            router.push(`/status?order=${encodeURIComponent(orderNo)}`)
          }
        >
          ดำเนินการต่อไป
        </button>
      </section>

      <BottomNav />
    </main>
  );
}
