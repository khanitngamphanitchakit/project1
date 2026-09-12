import type { OrderStatus } from "@/lib/orders";
import { STATUS_LABEL, STEP_ORDER } from "@/lib/orders";
import { STATUS_ICON } from "./status-icons";

export default function StepTracker({ status }: { status: OrderStatus }) {
  const currentIndex = STEP_ORDER.indexOf(status);

  return (
    <ol className="step-tracker" aria-label="สถานะการดำเนินการของออเดอร์">
      {STEP_ORDER.map((step, index) => {
        const Icon = STATUS_ICON[step];
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isUpcoming = index > currentIndex;

        return (
          <li key={step} className="step-item">
            {index > 0 && (
              <span
                className={isDone || isCurrent ? "step-connector done" : "step-connector"}
                aria-hidden="true"
              />
            )}

            <span
              className={
                "step-circle" +
                (isDone ? " done" : "") +
                (isCurrent ? ` current status-${step}` : "") +
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
