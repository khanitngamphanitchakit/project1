"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

export default function HomePage() {
  const router = useRouter();
  const [orderNo, setOrderNo] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    const value = orderNo.trim();

    if (!value) {
      setError("กรุณากรอกหมายเลข Order");
      return;
    }

    const normalized = value.replace(/\s+/g, " ");

    if (!/^ORD\s*-\s*\d+$/i.test(normalized)) {
      setError("รูปแบบไม่ถูกต้อง เช่น ORD - 28587965432159");
      return;
    }

    router.push(`/status?order=${encodeURIComponent(normalized)}`);
  };

  return (
    <main className="app-shell">
      <Header />

      <section className="page-content">
        <div className="tracking-card">
          <h1>ติดตามออเดอร์</h1>

          <label htmlFor="order">กรอกหมายเลข Order</label>

          <div className="search-row">
            <input
              id="order"
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
              autoComplete="off"
            />

            <button
              type="button"
              className="search-button"
              onClick={handleSearch}
              aria-label="ค้นหา"
            >
              ⌕
            </button>
          </div>

          <p className="format-help">เช่น ORD - 28587965432159</p>

          {error && <p className="error-message">{error}</p>}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
