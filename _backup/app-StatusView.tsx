"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import StepTracker from "../components/StepTracker";
import { ChevronLeftIcon, CopyIcon, OrderIcon } from "../components/icons";
import type { Order } from "../lib/orders";
import {
  STATUS_LABEL,
  formatBaht,
  formatThaiDate,
  formatThaiTime,
  getOrder,
  orderTotal,
  updateOrderStatus,
} from "../lib/orders";

export default function StatusView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderParam = searchParams.get("order") ?? "";

  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!orderParam) {
      setOrder(null);
      return;
    }
    setOrder(getOrder(orderParam) ?? null);
  }, [orderParam]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const total = useMemo(() => (order ? orderTotal(order) : 0), [order]);

  const handleCopy = async () => {
    if (!order) return;
    try {
      await navigator.clipboard.writeText(order.orderNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setToast("ไม่สามารถคัดลอกได้ กรุณาคัดลอกด้วยตนเอง");
    }
  };

  const handlePay = () => {
    if (!order) return;
    updateOrderStatus(order.orderNo, "completed");
    setOrder({ ...order, status: "completed" });
    setToast("ชำระเงินสำเร็จ ขอบคุณที่ใช้บริการ");
  };

  return (
    <main className="app-shell">
      <Header />

      <div className="page-heading-row">
        <button
          type="button"
          className="back-button"
          aria-label="ย้อนกลับ"
          onClick={() => router.push("/")}
        >
          <ChevronLeftIcon className="back-icon" />
        </button>
        <h1>รายละเอียดออเดอร์</h1>
      </div>

      <section className="page-content">
        {order === undefined ? null : order === null ? (
          <div className="empty-state">
            <p>
              {orderParam
                ? "ไม่พบออเดอร์นี้ในระบบ กรุณาตรวจสอบหมายเลขอีกครั้ง"
                : "ยังไม่มีออเดอร์ที่กำลังติดตามอยู่ ลองค้นหาจากหน้าแรก"}
            </p>
            <button type="button" className="primary-button" onClick={() => router.push("/")}>
              ไปหน้าค้นหาออเดอร์
            </button>
          </div>
        ) : (
          <>
            <div className="status-summary-card">
              <span className="status-summary-icon" aria-hidden="true">
                <OrderIcon className="status-summary-icon-svg" />
              </span>
              <span className="status-summary-main">
                <span className="status-summary-no">{order.orderNo}</span>
                <span className="status-summary-date">
                  {formatThaiDate(order.createdAt)} เวลา {formatThaiTime(order.createdAt)}
                </span>
              </span>
            </div>

            <StepTracker status={order.status} />

            <div className="detail-box">
              <p className="detail-row-label">รหัส Order : {order.orderNo}</p>

              <div className="detail-status-row">
                <h2>สถานะ : {STATUS_LABEL[order.status]}</h2>
                <button
                  type="button"
                  className={copied ? "copy-pill copied" : "copy-pill"}
                  onClick={handleCopy}
                  aria-label="คัดลอกหมายเลขออเดอร์"
                >
                  <CopyIcon className="copy-pill-icon" />
                  {copied ? "คัดลอกแล้ว" : "คัดลอก"}
                </button>
              </div>

              <div className="product-list">
                {order.items.map((item, index) => (
                  <div className="product-row" key={`${item.name}-${index}`}>
                    <span>{item.name}</span>
                    <strong className="product-price">
                      {(item.price * item.quantity).toLocaleString("th-TH")}
                    </strong>
                    <span className="product-qty">×{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="total-row">
                <span>รวม</span>
                <span>{formatBaht(total)}</span>
              </div>

              <p className="order-date">
                วันที่และเวลาที่ทำรายการ {formatThaiDate(order.createdAt)} | {formatThaiTime(order.createdAt)}
              </p>
            </div>

            <div className="status-action">
              {order.status === "awaiting_payment" && (
                <button type="button" className="primary-button" onClick={handlePay}>
                  ชำระเงินตอนนี้
                </button>
              )}

              {order.status === "completed" && (
                <p className="status-note completed">
                  ออเดอร์นี้เสร็จสมบูรณ์แล้ว ขอบคุณที่ใช้บริการ
                </p>
              )}

              {(order.status === "queued" || order.status === "in_progress") && (
                <p className="status-note">
                  ระบบจะอัปเดตสถานะให้อัตโนมัติเมื่อออเดอร์ของคุณคืบหน้า
                </p>
              )}
            </div>
          </>
        )}
      </section>

      {toast && <div className="toast">{toast}</div>}

      <BottomNav />
    </main>
  );
}
