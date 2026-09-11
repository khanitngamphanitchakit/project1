import type { ComponentType } from "react";
import type { OrderStatus } from "./status/orders";
import { STATUS_LABEL } from "./status/orders";

import {
  CalendarClockIcon,
  CheckIcon,
  DownloadIcon,
  ProcessingIcon,
} from "./icons";

const STATUS_ICON: Record<
  OrderStatus,
  ComponentType<{ className?: string }>
> = {
  queued: DownloadIcon,
  in_progress: ProcessingIcon,
  awaiting_payment: CalendarClockIcon,
  completed: CheckIcon,
};

export default function StatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  const Icon = STATUS_ICON[status];

  return (
    <span className={`status-badge status-${status}`}>
      <span>{STATUS_LABEL[status]}</span>
      <Icon className="status-badge-icon" />
    </span>
  );
}

