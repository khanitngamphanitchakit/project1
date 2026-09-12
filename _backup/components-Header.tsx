"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [orderNo, setOrderNo] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    const value = orderNo.trim();

    if (!value) {
      setError("กรุณากรอกหมายเลข Order");
      return;
    }

    // รูปแบบ ORD - 28587965432159
    const orderPattern = /^ORD\s*-\s*\d+$/i;

    if (!orderPattern.test(value)) {
      setError(
        "รูปแบบ Order ไม่ถูกต้อง เช่น ORD - 28587965432159"
      );
      return;
    }

    setError("");

    router.push(
      `/status?order=${encodeURIComponent(value)}`
    );
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <button className="hamburger" type="button">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <h1>ติดตามออเดอร์</h1>
      </header>

      {/* Content */}
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
              value={orderNo}
              onChange={(e) => {
                setOrderNo(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="ORD - 28587965432159"
            />

            <button
              type="button"
              onClick={handleSearch}
            >
              ค้นหา
            </button>
          </div>

          <p className="helper">
            รูปแบบที่ถูกต้อง เช่น{" "}
            <strong>ORD - 28587965432159</strong>
          </p>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button
          className="bottom-nav-item active"
          type="button"
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