"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import StepTracker from "../components/StepTracker";
import StatusBadge from "../components/StatusBadge";
import CopyButton from "../components/CopyButton";
import {
  EmptyState,
  ErrorState,
  LoadingAnnouncer,
  OrderDetailSkeleton,
  OrderNotFound,
} from "../components/States";
import { ChevronLeftIcon, OrderIcon, SearchIcon } from "../icons";
import type { Order } from "@/lib/orders";
import {
  InvalidOrderInputError,
  NEXT_ACTION_LABEL,
  OrderNotFoundError,
  STATUS_DESCRIPTION,
  STATUS_LABEL,
  advanceOrder,
  fetchOrder,
  formatBaht,
  formatOrderNo,
  formatThaiDate,
  formatThaiTime,
  orderTotal,
} from "@/lib/orders";

type ViewState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ready"; order: Order }
  | { kind: "notFound"; orderNo: string }
  | { kind: "invalid" }
  | { kind: "error" };

export default function StatusView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderParam = searchParams.get("order") ?? "";

  const [state, setState] = useState<ViewState>({ kind: "loading" });
  const [toast, setToast] = useState("");

  const load = useCallback(async () => {
    if (!orderParam) {
      setState({ kind: "idle" });
      return;
    }

    setState({ kind: "loading" });

    try {
      const order = await fetchOrder(orderParam);
      setState({ kind: "ready", order });
    } catch (e) {
      if (e instanceof InvalidOrderInputError) {
        setState({ kind: "invalid" });
      } else if (e instanceof OrderNotFoundError) {
        setState({ kind: "notFound", orderNo: formatOrderNo(orderParam) });
      } else {
        setState({ kind: "error" });
      }
    }
  }, [orderParam]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  const order = state.kind === "ready" ? state.order : null;
  const total = useMemo(() => (order ? orderTotal(order) : 0), [order]);

  const handleAdvance = () => {
    if (!order) return;

    const updated = advanceOrder(order);
    if (!updated) return;

    setState({ kind: "ready", order: updated });
    setToast(`อัปเดตสถานะเป็น "${STATUS_LABEL[updated.status]}" แล้ว`);
  };

  return (
    <div className="app-shell">
      <Header />

      <div className="page-heading-row">
        <button
          type="button"
          className="back-button"
          aria-label="ย้อนกลับ"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon className="back-icon" />
        </button>
        <h1>รายละเอียดออเดอร์</h1>
      </div>

      <main className="app-main">
        <section className="page-content">
          {state.kind === "loading" && (
            <>
              <LoadingAnnouncer label="กำลังโหลดรายละเอียดออเดอร์" />
              <OrderDetailSkeleton />
            </>
          )}

          {state.kind === "idle" && (
            <EmptyState
              title="ยังไม่ได้เลือกออเดอร์"
              description="ค้นหาหมายเลขออเดอร์จากหน้าแรก หรือเลือกจากรายการออเดอร์ทั้งหมด"
              action={
                <Link href="/" className="primary-button state-button">
                  <SearchIcon className="state-button-icon" />
                  ค้นหาออเดอร์
                </Link>
              }
            />
          )}

          {state.kind === "notFound" && <OrderNotFound orderNo={state.orderNo} />}

          {state.kind === "invalid" && (
            <ErrorState
              title="รหัสออเดอร์ไม่ถูกต้อง"
              description="หมายเลขที่ระบุไม่ตรงรูปแบบที่ระบบรองรับ ต้องมีตัวเลขอย่างน้อย 5 หลัก เช่น ORD - 28587965432159"
            />
          )}

          {state.kind === "error" && (
            <ErrorState
              title="โหลดข้อมูลไม่สำเร็จ"
              description="เกิดข้อผิดพลาดระหว่างดึงข้อมูลออเดอร์ กรุณาลองใหม่อีกครั้ง"
              onRetry={load}
            />
          )}

          {state.kind === "ready" && order && (
            <div className="status-detail-grid">
              <div className="status-detail-col">
                <div className="status-summary-card">
                  <span className="status-summary-icon" aria-hidden="true">
                    <OrderIcon className="status-summary-icon-svg" />
                  </span>

                  <span className="status-summary-main">
                    <span className="status-summary-no">{order.orderNo}</span>
                    <span className="status-summary-date">
                      {formatThaiDate(order.createdAt)} เวลา{" "}
                      {formatThaiTime(order.createdAt)}
                    </span>
                  </span>

                  <CopyButton value={order.orderNo} compact />
                </div>

                <div className="status-headline">
                  <StatusBadge status={order.status} size="lg" />
                  <p className="status-headline-desc">
                    {STATUS_DESCRIPTION[order.status]}
                  </p>
                </div>

                <StepTracker status={order.status} />
              </div>

              <div className="status-detail-col">
              <div className="detail-box">
                <p className="detail-row-label">รหัสออเดอร์ : {order.orderNo}</p>

                <div className="detail-status-row">
                  <h2>สถานะ : {STATUS_LABEL[order.status]}</h2>
                  <CopyButton value={order.orderNo} />
                </div>

                <div className="product-list">
                  {order.items.map((item, index) => (
                    <div className="product-row" key={`${item.name}-${index}`}>
                      <span className="product-name">{item.name}</span>
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
                  วันที่และเวลาที่ทำรายการ {formatThaiDate(order.createdAt)} |{" "}
                  {formatThaiTime(order.createdAt)}
                </p>
              </div>

              <div className="status-action">
                {order.status === "completed" ? (
                  <p className="status-note completed">
                    ออเดอร์นี้เสร็จสมบูรณ์แล้ว ขอบคุณที่ใช้บริการ
                  </p>
                ) : (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={handleAdvance}
                  >
                    {NEXT_ACTION_LABEL[order.status]}
                  </button>
                )}
              </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
