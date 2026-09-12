"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
import type { Order } from "@/lib/orders";
import { fetchAllOrders, isActiveOrder } from "@/lib/orders";

type TabKey = "active" | "past";

const TABS: { key: TabKey; label: string; hint: string }[] = [
  {
    key: "active",
    label: "ออเดอร์ปัจจุบัน",
    hint: "ออเดอร์ที่ยังอยู่ระหว่างดำเนินการ",
  },
  {
    key: "past",
    label: "ออเดอร์ที่ผ่านมา",
    hint: "ออเดอร์ที่เสร็จสิ้นแล้ว",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [tab, setTab] = useState<TabKey>("active");

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

  const { active, past } = useMemo(
    () => ({
      active: orders.filter(isActiveOrder),
      past: orders.filter((o) => !isActiveOrder(o)),
    }),
    [orders]
  );

  const visible = tab === "active" ? active : past;
  const counts: Record<TabKey, number> = {
    active: active.length,
    past: past.length,
  };

  return (
    <div className="app-shell">
      <Header />

      <div className="page-heading-row">
        <h1>รายการออเดอร์</h1>
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
              <div className="tab-row is-skeleton" aria-hidden="true">
                <span className="skeleton skeleton-tab" />
                <span className="skeleton skeleton-tab" />
              </div>
              <OrderListSkeleton count={5} />
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
              <div className="tab-row" role="tablist" aria-label="ประเภทออเดอร์">
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    id={`tab-${t.key}`}
                    aria-selected={tab === t.key}
                    aria-controls={`panel-${t.key}`}
                    className={tab === t.key ? "tab active" : "tab"}
                    onClick={() => setTab(t.key)}
                  >
                    {t.label}
                    <span className="tab-count">{counts[t.key]}</span>
                  </button>
                ))}
              </div>

              <div
                role="tabpanel"
                id={`panel-${tab}`}
                aria-labelledby={`tab-${tab}`}
              >
                {visible.length === 0 ? (
                  <EmptyState
                    title={
                      tab === "active"
                        ? "ไม่มีออเดอร์ที่กำลังดำเนินการ"
                        : "ยังไม่มีออเดอร์ที่เสร็จสิ้น"
                    }
                    description={
                      tab === "active"
                        ? "ออเดอร์ของคุณเสร็จสิ้นทั้งหมดแล้ว ดูย้อนหลังได้ที่แท็บออเดอร์ที่ผ่านมา"
                        : "เมื่อมีออเดอร์ที่ดำเนินการเสร็จ รายการจะย้ายมาแสดงที่นี่"
                    }
                    action={
                      <button
                        type="button"
                        className="primary-button state-button"
                        onClick={() => setTab(tab === "active" ? "past" : "active")}
                      >
                        {tab === "active"
                          ? "ดูออเดอร์ที่ผ่านมา"
                          : "ดูออเดอร์ปัจจุบัน"}
                      </button>
                    }
                  />
                ) : (
                  <>
                    <p className="orders-count">
                      {TABS.find((t) => t.key === tab)?.hint} · {visible.length}{" "}
                      รายการ
                    </p>

                    <div className="order-list">
                      {visible.map((order) => (
                        <OrderCard key={order.orderNo} order={order} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
