"use client";

import { useRouter } from "next/navigation";
import type { Order } from "../orders";
import { formatThaiDate } from "../orders";
import { OrderIcon } from "../icons";
import StatusBadge from "../StatusBadge";

export default function OrderCard({ order }: { order: Order }) {
  const router = useRouter();

  const goToDetail = () => {
    router.push(`/status?order=${encodeURIComponent(order.orderNo)}`);
  };

  return (
    <button
      type="button"
      className="order-summary-card"
      onClick={goToDetail}
    >
      <span className="order-summary-icon" aria-hidden="true">
        <OrderIcon className="order-summary-icon-svg" />
      </span>

      <span className="order-summary-main">
        <span className="order-summary-no">{order.orderNo}</span>

        <span className="order-summary-date">
          {formatThaiDate(order.createdAt)}
        </span>
      </span>

      <StatusBadge status={order.status} />
    </button>
  );
}