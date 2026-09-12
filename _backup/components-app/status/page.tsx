"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function StatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const order =
    searchParams.get("order") ||
    "ORD - 28587965432159";

  return (
    <div className="app">
      <header className="header">
        <button className="hamburger" type="button">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <h1>สถานะออเดอร์</h1>
      </header>

      <main className="content">
        <section className="tracking-card">
          <h2>ติดตามออเดอร์</h2>

          <label htmlFor="order">
            หมายเลข Order
          </label>

          <div className="search-row">
            <input
              id="order"
              type="text"
              value={order}
              readOnly
            />

            <button
              type="button"
              onClick={() =>
                router.push(
                  `/status?order=${encodeURIComponent(order)}`
                )
              }
            >
              ค้นหา
            </button>
          </div>

          <p className="helper">
            หมายเลข Order ที่กำลังติดตาม
          </p>
        </section>

        <section className="status-section">
          <div className="status-title">
            สถานะออเดอร์
          </div>

          <div className="order-number">
            {order}
          </div>

          <div className="status-steps">
            <div className="status-step active">
              <div className="status-circle">
                ✓
              </div>

              <div className="status-text">
                <strong>อยู่ในคิว</strong>
                <span>ได้รับคำสั่งซื้อแล้ว</span>
              </div>
            </div>

            <div className="status-line"></div>

            <div className="status-step">
              <div className="status-circle">2</div>

              <div className="status-text">
                <strong>กำลังดำเนินการ</strong>
                <span>กำลังจัดเตรียมออเดอร์</span>
              </div>
            </div>

            <div className="status-line"></div>

            <div className="status-step">
              <div className="status-circle">3</div>

              <div className="status-text">
                <strong>เสร็จสิ้น</strong>
                <span>ดำเนินการเรียบร้อยแล้ว</span>
              </div>
            </div>

            <div className="status-line"></div>

            <div className="status-step">
              <div className="status-circle">4</div>

              <div className="status-text">
                <strong>รอชำระเงิน</strong>
                <span>รอการชำระเงิน</span>
              </div>
            </div>
          </div>

          <p className="waiting-text">
            โปรดรอสักครู่......
          </p>

          <button
            className="back-button"
            type="button"
            onClick={() => router.push("/")}
          >
            ← กลับไปหน้าติดตามออเดอร์
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
          className="bottom-nav-item active"
          type="button"
        >
          <span className="nav-icon">◷</span>
          <span>สถานะ</span>
        </button>

        <button
          className="bottom-nav-item"
          type="button"
          onClick={() => router.push("/orders")}
        >
          <span className="nav-icon">☷</span>
          <span>รายการออเดอร์</span>
        </button>
      </nav>
    </div>
  );
}