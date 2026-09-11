"use client";

import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const router = useRouter();

  const orderNumber = "ORD - 28587965432159";

  const copyOrderNumber = async () => {
    try {
      await navigator.clipboard.writeText(orderNumber);
      alert("คัดลอกหมายเลข Order แล้ว");
    } catch {
      alert("ไม่สามารถคัดลอกได้");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <button className="hamburger" type="button">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <h1>รายการออเดอร์</h1>
      </header>

      <main className="content">
        <div className="order-tabs">
          <button
            type="button"
            className="order-tab active"
          >
            ออเดอร์ปัจจุบัน
          </button>

          <button
            type="button"
            className="order-tab"
          >
            ออเดอร์ที่ผ่านมา
          </button>
        </div>

        <section className="order-card">
          <div className="order-header">
            <div>
              <div className="order-label">
                หมายเลข Order
              </div>

              <div className="order-number-large">
                {orderNumber}
              </div>
            </div>

            <button
              type="button"
              className="copy-button"
              onClick={copyOrderNumber}
            >
              คัดลอก
            </button>
          </div>

          <div className="order-status">
            <span className="status-dot"></span>
            รอชำระเงิน
          </div>

          <div className="products">
            <div className="product-row">
              <span>xxxxxxx</span>
              <span>100 บาท</span>
            </div>

            <div className="product-row">
              <span>xxxxxxx</span>
              <span>100 บาท</span>
            </div>

            <div className="product-row">
              <span>xxxxxxx</span>
              <span>100 บาท</span>
            </div>

            <div className="product-row">
              <span>xxxxxxx</span>
              <span>189 บาท</span>
            </div>
          </div>

          <div className="order-total">
            <span>รวมทั้งหมด</span>
            <strong>489 บาท</strong>
          </div>

          <div className="order-date">
            วันที่สั่งซื้อ 11/09/2026 เวลา 10:30 น.
          </div>

          <button
            className="continue-button"
            type="button"
            onClick={() =>
              router.push(
                `/status?order=${encodeURIComponent(
                  orderNumber
                )}`
              )
            }
          >
            ดูสถานะออเดอร์
          </button>
        </section>
      </main>

      <nav className="bottom-nav">
        <button
          className="bottom-nav-item"
          type="button"
          onClick={() => router.push("/")}
        >
          <span className="nav-icon">⌕</span>
          <span>ติดตามออเดอร์</span>
        </button>

        <button
          className="bottom-nav-item"
          type="button"
          onClick={() => router.push("/status")}
        >
          <span className="nav-icon">◷</span>
          <span>สถานะ</span>
        </button>

        <button
          className="bottom-nav-item active"
          type="button"
        >
          <span className="nav-icon">☷</span>
          <span>รายการออเดอร์</span>
        </button>
      </nav>
    </div>
  );
}