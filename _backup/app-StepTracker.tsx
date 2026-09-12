import type { ComponentType } from "react";
import type { OrderStatus } from "../lib/orders";
import { STATUS_LABEL, STEP_ORDER } from "../lib/orders";
import { CalendarClockIcon, CheckBoxIcon, DownloadIcon, ProcessingIcon } from "./icons";

const STEP_ICON: Record<OrderStatus, ComponentType<{ className?: string }>> = {
  queued: DownloadIcon,
  in_progress: ProcessingIcon,
  awaiting_payment: CalendarClockIcon,
  completed: CheckBoxIcon,
};

export default function StepTracker({ status }: { status: OrderStatus }) {
  const currentIndex = STEP_ORDER.indexOf(status);

  return (
    <ol className="step-tracker" aria-label="สถานะการดำเนินการของออเดอร์">
      {STEP_ORDER.map((step, index) => {
        const Icon = STEP_ICON[step];
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isUpcoming = index > currentIndex;

        return (
          <li key={step} className="step-item">
            {index > 0 && <span className="step-connector" aria-hidden="true" />}
            <span
              className={
                "step-circle" +
                (isDone ? " done" : "") +
                (isCurrent ? " current" : "") +
                (isUpcoming ? " upcoming" : "")
              }
              aria-current={isCurrent ? "step" : undefined}
            >
              <Icon className="step-icon" />
            </span>
            <span className={"step-label" + (isUpcoming ? " upcoming" : "")}>
              {STATUS_LABEL[step]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
