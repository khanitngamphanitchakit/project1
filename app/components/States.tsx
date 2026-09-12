import type { ReactNode } from "react";
import Link from "next/link";
import { OrderIcon, SearchIcon } from "../icons";

/* ---------------- LOADING ---------------- */

/** โครงการ์ดออเดอร์ตอนกำลังโหลด — ขนาดเท่าการ์ดจริงเพื่อไม่ให้หน้าเด้ง */
export function OrderListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="order-list" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div className="order-summary-card is-skeleton" key={i}>
          <span className="skeleton skeleton-icon" />
          <span className="order-summary-main">
            <span className="skeleton skeleton-line w-70" />
            <span className="skeleton skeleton-line w-40" />
          </span>
          <span className="skeleton skeleton-badge" />
        </div>
      ))}
    </div>
  );
}

/** โครงหน้ารายละเอียดออเดอร์ตอนกำลังโหลด */
export function OrderDetailSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="status-summary-card is-skeleton">
        <span className="skeleton skeleton-icon lg" />
        <span className="status-summary-main">
          <span className="skeleton skeleton-line w-70" />
          <span className="skeleton skeleton-line w-50" />
        </span>
      </div>

      <div className="step-tracker-skeleton">
        {Array.from({ length: 4 }, (_, i) => (
          <div className="step-skeleton" key={i}>
            <span className="skeleton skeleton-circle" />
            <span className="skeleton skeleton-line w-90" />
          </div>
        ))}
      </div>

      <div className="detail-box is-skeleton">
        <span className="skeleton skeleton-line w-50" />
        <span className="skeleton skeleton-line w-70 tall" />
        <div className="skeleton-rows">
          {Array.from({ length: 4 }, (_, i) => (
            <span className="skeleton skeleton-line" key={i} />
          ))}
        </div>
        <span className="skeleton skeleton-line w-40 tall" />
      </div>
    </div>
  );
}

/** ข้อความบอกสถานะกำลังโหลดสำหรับ screen reader */
export function LoadingAnnouncer({ label }: { label: string }) {
  return (
    <p className="sr-only" role="status" aria-live="polite">
      {label}
    </p>
  );
}

/* ---------------- EMPTY ---------------- */

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="state-block empty-state" role="status">
      <span className="state-icon" aria-hidden="true">
        <OrderIcon className="state-icon-svg" />
      </span>
      <h2 className="state-title">{title}</h2>
      <p>{description}</p>
      {action}
    </div>
  );
}

/** ไม่พบออเดอร์ที่ค้นหา — เป็น empty state ไม่ใช่ error เพราะผู้ใช้กรอกถูกรูปแบบแล้ว */
export function OrderNotFound({ orderNo }: { orderNo?: string }) {
  return (
    <EmptyState
      title="ไม่พบออเดอร์นี้ในระบบ"
      description={
        orderNo
          ? `ไม่พบข้อมูลของ ${orderNo} กรุณาตรวจสอบหมายเลขอีกครั้ง หรือค้นหาใหม่`
          : "กรุณาตรวจสอบหมายเลขออเดอร์อีกครั้ง หรือค้นหาใหม่"
      }
      action={
        <Link href="/" className="primary-button state-button">
          <SearchIcon className="state-button-icon" />
          ค้นหาออเดอร์ใหม่
        </Link>
      }
    />
  );
}

/* ---------------- ERROR ---------------- */

export function ErrorState({
  title,
  description,
  onRetry,
  retryLabel = "ลองอีกครั้ง",
}: {
  title: string;
  description: string;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  return (
    <div className="state-block error-state" role="alert">
      <span className="state-icon danger" aria-hidden="true">
        !
      </span>
      <h2 className="state-title">{title}</h2>
      <p>{description}</p>

      {onRetry ? (
        <button type="button" className="primary-button state-button" onClick={onRetry}>
          {retryLabel}
        </button>
      ) : (
        <Link href="/" className="primary-button state-button">
          กลับหน้าแรก
        </Link>
      )}
    </div>
  );
}
