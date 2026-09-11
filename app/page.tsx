"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import OrderCard from "./components/OrderCard";
import { SearchIcon, ChevronRightIcon } from "./components/icons";
import type { Order } from "./lib/orders";
import { getOrder, getRecentOrders, isValidOrderInput } from "./lib/orders";

export default function HomePage() {
  const router = useRouter();
  const [orderNo, setOrderNo] = useState("");
  const [error, setError] = useState("");
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  // Order data lives in localStorage, so it's loaded after mount to avoid
  // a server/client mismatch on first render.
  useEffect(() => {
    setRecentOrders(getRecentOrders(3));
  }, []);

  const handleSearch = () => {
    const value = orderNo.trim();

    if (!value) {
      setError("กรุณากรอกหมายเลข Order");
      return;
    }

    if (!isValidOrderInput(value)) {
      setError("รูปแบบไม่ถูกต้อง เช่น ORD - 28587965432159");
      return;
    }

    const found = getOrder(value);
    if (!found) {
      setError("ไม่พบออเดอร์นี้ในระบบ กรุณาตรวจสอบหมายเลขอีกครั้ง");
      return;
    }

    router.push(`/status?order=${encodeURIComponent(found.orderNo)}`);
  };

  return (
    <main className="app-shell">
      <Header />

      <section className="tracking-hero">
        <h1>ติดตามออเดอร์ของคุณ</h1>
        <p>
          กรอกหมายเลขออเดอร์ เพื่อดูสถานะการจัดส่งของคุณได้ทันที
        </p>

        <div className="search-field">
          <label htmlFor="order">หมายเลข Order</label>

          <div className="search-row">
            <SearchIcon className="search-icon" />
            <input
              id="order"
              value={orderNo}
              onChange={(e) => {
                setOrderNo(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder="เช่น ORD - 28587965432159"
              autoComplete="off"
              inputMode="text"
            />
          </div>

          <p className="format-help">
            พิมพ์เฉพาะตัวเลขก็ได้ ระบบจะจัดรูปแบบให้อัตโนมัติ
          </p>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
        </div>

        <button type="button" className="primary-button" onClick={handleSearch}>
          ค้นหา
        </button>
      </section>

      <section className="page-content">
        <div className="section-heading-row">
          <h2>ออเดอร์ล่าสุด</h2>
          <button
            type="button"
            className="see-all-link"
            onClick={() => router.push("/orders")}
          >
            ดูทั้งหมด
            <ChevronRightIcon className="see-all-icon" />
          </button>
        </div>

        <div className="order-list">
          {recentOrders.map((order) => (
            <OrderCard key={order.orderNo} order={order} />
          ))}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
