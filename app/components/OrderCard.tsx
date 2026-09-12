import Link from "next/link";
import type { Order } from "@/lib/orders";
import { formatDateTimeShort } from "@/lib/orders";
import { ChevronRightIcon, OrderIcon } from "../icons";
import StatusBadge from "./StatusBadge";
import CopyButton from "./CopyButton";

export default function OrderCard({ order }: { order: Order }) {
  return (
    <article className="order-summary-card">
      {/* ส่วนที่กดเพื่อเข้าหน้ารายละเอียด — แยกจากปุ่มคัดลอก ไม่ให้กดชนกัน */}
      <Link
        href={`/status?order=${encodeURIComponent(order.orderNo)}`}
        className="order-summary-link"
        aria-label={`ดูรายละเอียด ${order.orderNo}`}
      >
        <span className="order-summary-icon" aria-hidden="true">
          <OrderIcon className="order-summary-icon-svg" />
        </span>

        <span className="order-summary-main">
          <span className="order-summary-no"># {order.orderNo}</span>
          <span className="order-summary-date">
            {formatDateTimeShort(order.createdAt)}
          </span>
        </span>

        <ChevronRightIcon className="order-summary-chevron" />
      </Link>

      <div className="order-summary-foot">
        <StatusBadge status={order.status} />
        <CopyButton value={order.orderNo} label="คัดลอกเลขออเดอร์" />
      </div>
    </article>
  );
}
