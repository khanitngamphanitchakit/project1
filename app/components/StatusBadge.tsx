import type { OrderStatus } from "@/lib/orders";
import { STATUS_LABEL } from "@/lib/orders";
import { STATUS_ICON } from "./status-icons";

export default function StatusBadge({
  status,
  size = "sm",
}: {
  status: OrderStatus;
  /** lg = ใช้ในหน้ารายละเอียด, sm = ใช้ในการ์ดรายการ */
  size?: "sm" | "lg";
}) {
  const Icon = STATUS_ICON[status];

  return (
    <span
      className={`status-badge status-${status}${size === "lg" ? " lg" : ""}`}
    >
      <span className="status-dot" aria-hidden="true" />
      <Icon className="status-badge-icon" />
      <span className="status-badge-text">{STATUS_LABEL[status]}</span>
    </span>
  );
}
