import { Suspense } from "react";
import StatusView from "./StatusView";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { LoadingAnnouncer, OrderDetailSkeleton } from "../components/States";

/** useSearchParams ต้องอยู่ใต้ Suspense — fallback ใช้โครงเดียวกับตอนโหลดข้อมูล */
function StatusFallback() {
  return (
    <div className="app-shell">
      <Header />

      <div className="page-heading-row">
        <h1>รายละเอียดออเดอร์</h1>
      </div>

      <main className="app-main">
        <section className="page-content">
          <LoadingAnnouncer label="กำลังโหลดรายละเอียดออเดอร์" />
          <OrderDetailSkeleton />
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

export default function StatusPage() {
  return (
    <Suspense fallback={<StatusFallback />}>
      <StatusView />
    </Suspense>
  );
}
