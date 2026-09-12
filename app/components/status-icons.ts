import type { ComponentType } from "react";
import type { OrderStatus } from "@/lib/orders";
import { BahtIcon, CheckIcon, ProcessingIcon, QueueIcon } from "../icons";

/**
 * ไอคอนประจำแต่ละสถานะ — ใช้ร่วมกันทั้ง StatusBadge และ StepTracker
 * เพื่อให้ผู้ใช้จำสัญลักษณ์เดียวกันได้ทุกหน้า
 */
export const STATUS_ICON: Record<
  OrderStatus,
  ComponentType<{ className?: string }>
> = {
  queued: QueueIcon,
  in_progress: ProcessingIcon,
  awaiting_payment: BahtIcon,
  completed: CheckIcon,
};
