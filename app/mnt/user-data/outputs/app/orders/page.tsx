"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import OrderCard from "../components/OrderCard";
import { ChevronLeftIcon } from "../components/icons";
import type { Order } from "../lib/orders";
import { getAllOrders } from "../lib/orders";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    setOrders(getAllOrders());
  }, []);

  return (
    <main className="app-shell">
      <Header />

      <div className="page-heading-row">
        <button
          type="button"
          className="back-button"
          aria-label="กลับหน้าแรก"
          onClick={() => router.push("/")}
        >
          <ChevronLeftIcon className="back-icon" />
        </button>
        <h1>ออเดอร์ทั้งหมด</h1>
      </div>

      <section className="page-content">
        {orders === null ? null : orders.length === 0 ? (
          <div className="empty-state">
            <p>ยังไม่มีออเดอร์ในระบบ</p>
            <button type="button" className="primary-button" onClick={() => router.push("/")}>
              ค้นหาออเดอร์
            </button>
          </div>
        ) : (
          <>
            <p className="orders-count">ทั้งหมด {orders.length} รายการ</p>
            <div className="order-list">
              {orders.map((order) => (
                <OrderCard key={order.orderNo} order={order} />
              ))}
            </div>
          </>
        )}
      </section>

      <BottomNav />
    </main>
  );
}
