"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import OrderCard from "../components/OrderCard";
import {
  EmptyState,
  ErrorState,
  LoadingAnnouncer,
  OrderListSkeleton,
} from "../components/States";
import { STATUS_LABEL, STEP_ORDER } from "@/lib/orders";
import type { Order, OrderStatus } from "@/lib/orders";
import { fetchAllOrders } from "@/lib/orders";

type Filter = OrderStatus | "all";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "ทั้งหมด" },
  ...STEP_ORDER.map((s) => ({ value: s as Filter, label: STATUS_LABEL[s] })),
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  const load = useCallback(() => {
    setLoading(true);
    setFailed(false);

    return fetchAllOrders()
      .then(setOrders)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const visible =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="app-shell">
      <Header />

      <div className="page-heading-row">
        <h1>ออเดอร์ทั้งหมด</h1>
      </div>

      <main className="app-main">
        <section className="page-content">
          {failed ? (
            <ErrorState
              title="โหลดรายการออเดอร์ไม่สำเร็จ"
              description="เกิดข้อผิดพลาดระหว่างดึงข้อมูล กรุณาลองใหม่อีกครั้ง"
              onRetry={load}
            />
          ) : loading ? (
            <>
              <LoadingAnnouncer label="กำลังโหลดรายการออเดอร์" />
              <OrderListSkeleton count={6} />
            </>
          ) : orders.length === 0 ? (
            <EmptyState
              title="ยังไม่มีออเดอร์"
              description="เมื่อคุณสั่งซื้อสินค้า รายการออเดอร์ทั้งหมดจะแสดงที่นี่"
              action={
                <Link href="/" className="primary-button state-button">
                  ไปหน้าค้นหาออเดอร์
                </Link>
              }
            />
          ) : (
            <>
              <div className="filter-row" role="group" aria-label="กรองตามสถานะ">
                {FILTERS.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    className={filter === f.value ? "filter-chip active" : "filter-chip"}
                    onClick={() => setFilter(f.value)}
                    aria-pressed={filter === f.value}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <p className="orders-count">
                {filter === "all"
                  ? `ทั้งหมด ${orders.length} รายการ`
                  : `${STATUS_LABEL[filter]} ${visible.length} รายการ`}
              </p>

              {visible.length === 0 ? (
                <EmptyState
                  title={`ไม่มีออเดอร์สถานะ "${STATUS_LABEL[filter as OrderStatus]}"`}
                  description="ลองเลือกสถานะอื่น เพื่อดูรายการที่มีอยู่"
                  action={
                    <button
                      type="button"
                      className="primary-button state-button"
                      onClick={() => setFilter("all")}
                    >
                      ดูออเดอร์ทั้งหมด
                    </button>
                  }
                />
              ) : (
                <div className="order-list">
                  {visible.map((order) => (
                    <OrderCard key={order.orderNo} order={order} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
