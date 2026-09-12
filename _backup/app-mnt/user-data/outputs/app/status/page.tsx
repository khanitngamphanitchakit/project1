import { Suspense } from "react";
import StatusView from "./StatusView";

export default function StatusPage() {
  return (
    <Suspense fallback={null}>
      <StatusView />
    </Suspense>
  );
}
