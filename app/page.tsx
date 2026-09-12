"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import OrderCard from "./components/OrderCard";
import {
  EmptyState,
  LoadingAnnouncer,
  OrderListSkeleton,
} from "./components/States";
import { ChevronRightIcon, SearchIcon } from "./icons";
import type { Order } from "@/lib/orders";
import {
  InvalidOrderInputError,
  OrderNotFoundError,
  fetchOrder,
  fetchRecentOrders,
} from "@/lib/orders";

const RECENT_COUNT = 3;

export default function HomePage() {
  const router = useRouter();

  const [orderNo, setOrderNo] = useState("");
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  useEffect(() => {
    let active = true;

    fetchRecentOrders(RECENT_COUNT)
      .then((orders) => {
        if (active) setRecentOrders(orders);
      })
      .finally(() => {
        if (active) setLoadingRecent(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleSearch = async () => {
    const value = orderNo.trim();
    setError("");

    if (!value) {
      setError("กรุณากรอกหมายเลขออเดอร์ก่อนค้นหา");
      return;
    }

    setSearching(true);

    try {
      const found = await fetchOrder(value);
      router.push(`/status?order=${encodeURIComponent(found.orderNo)}`);
    } catch (e) {
      if (e instanceof InvalidOrderInputError) {
        setError("รูปแบบไม่ถูกต้อง ต้องมีตัวเลขอย่างน้อย 5 หลัก เช่น ORD - 28587965432159");
      } else if (e instanceof OrderNotFoundError) {
        setError("ไม่พบออเดอร์นี้ในระบบ กรุณาตรวจสอบหมายเลขอีกครั้ง");
      } else {
        setError("เกิดข้อผิดพลาดในการค้นหา กรุณาลองใหม่อีกครั้ง");
      }
      setSearching(false);
    }
  };

  return (
    <div className="app-shell">
      <Header />

      <main className="app-main">
        <section className="tracking-hero">
          <h1>ติดตามออเดอร์ของคุณ</h1>
          <p>กรอกหมายเลขออเดอร์ เพื่อดูสถานะการจัดส่งของคุณได้ทันที</p>

          <div className="search-field">
            <label htmlFor="order">หมายเลขออเดอร์</label>

            <div className="search-row">
              <SearchIcon className="search-icon" />

              <input
                id="order"
                value={orderNo}
                onChange={(e) => {
                  setOrderNo(e.target.value);
                  if (error) setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="เช่น ORD - 28587965432159"
                autoComplete="off"
                inputMode="text"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "order-error" : "order-help"}
                disabled={searching}
              />
            </div>

            <p className="format-help" id="order-help">
              พิมพ์เฉพาะตัวเลขก็ได้ ระบบจะจัดรูปแบบให้อัตโนมัติ
            </p>

            {error && (
              <p className="error-message" id="order-error" role="alert">
                {error}
              </p>
            )}
          </div>

          <button
            type="button"
            className="primary-button"
            onClick={handleSearch}
            disabled={searching}
          >
            {searching ? (
              <>
                <span className="spinner" aria-hidden="true" />
                กำลังค้นหา...
              </>
            ) : (
              "ค้นหา"
            )}
          </button>
        </section>

        <section className="page-content">
          <div className="section-heading-row">
            <h2>ออเดอร์ล่าสุด</h2>

            <Link href="/orders" className="see-all-link">
              ดูทั้งหมด
              <ChevronRightIcon className="see-all-icon" />
            </Link>
          </div>

          {loadingRecent ? (
            <>
              <LoadingAnnouncer label="กำลังโหลดออเดอร์ล่าสุด" />
              <OrderListSkeleton count={RECENT_COUNT} />
            </>
          ) : recentOrders.length === 0 ? (
            <EmptyState
              title="ยังไม่มีออเดอร์"
              description="เมื่อคุณมีออเดอร์ รายการล่าสุดจะแสดงที่นี่"
            />
          ) : (
            <div className="order-list">
              {recentOrders.map((order) => (
                <OrderCard key={order.orderNo} order={order} />
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
