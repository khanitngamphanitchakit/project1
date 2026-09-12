import Link from "next/link";
import type { Order } from "@/lib/orders";
import { formatThaiDate } from "@/lib/orders";
import { OrderIcon } from "../icons";
import StatusBadge from "./StatusBadge";

export default function OrderCard({ order }: { order: Order }) {
  return (
    <Link
      href={`/status?order=${encodeURIComponent(order.orderNo)}`}
      className="order-summary-card"
    >
      <span className="order-summary-icon" aria-hidden="true">
        <OrderIcon className="order-summary-icon-svg" />
      </span>

      <span className="order-summary-main">
        <span className="order-summary-no"># {order.orderNo}</span>
        <span className="order-summary-date">
          {formatThaiDate(order.createdAt)}
        </span>
      </span>

      <StatusBadge status={order.status} />
    </Link>
  );
}
