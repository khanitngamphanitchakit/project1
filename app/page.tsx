"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import OrderCard from "./components/OrderCard";
import { SearchIcon, ChevronRightIcon } from "./icons";
import type { Order } from "./status/orders";
import {getOrder,getRecentOrders,isValidOrderInput,} from "./status/orders";

export default function HomePage() {
  const router = useRouter();
  const [orderNo, setOrderNo] = useState("");
  const [error, setError] = useState("");
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    setRecentOrders(getRecentOrders(3));
  }, []);

  const handleSearch = () => {
    const value = orderNo.trim();

    if (!value) {
      setError("เธเธฃเธธเธ“เธฒเธเธฃเธญเธเธซเธกเธฒเธขเน€เธฅเธ Order");
      return;
    }

    if (!isValidOrderInput(value)) {
      setError("เธฃเธนเธเนเธเธเนเธกเนเธ–เธนเธเธ•เนเธญเธ เน€เธเนเธ ORD - 28587965432159");
      return;
    }

    const found = getOrder(value);

    if (!found) {
      setError("เนเธกเนเธเธเธญเธญเน€เธ”เธญเธฃเนเธเธตเนเนเธเธฃเธฐเธเธ เธเธฃเธธเธ“เธฒเธ•เธฃเธงเธเธชเธญเธเธซเธกเธฒเธขเน€เธฅเธเธญเธตเธเธเธฃเธฑเนเธ");
      return;
    }

    router.push(`/status?order=${encodeURIComponent(found.orderNo)}`);
  };

  return (
    <main className="app-shell">
      <Header />

      <section className="tracking-hero">
        <h1>เธ•เธดเธ”เธ•เธฒเธกเธญเธญเน€เธ”เธญเธฃเนเธเธญเธเธเธธเธ“</h1>

        <p>
          เธเธฃเธญเธเธซเธกเธฒเธขเน€เธฅเธเธญเธญเน€เธ”เธญเธฃเน เน€เธเธทเนเธญเธ”เธนเธชเธ–เธฒเธเธฐเธเธฒเธฃเธเธฑเธ”เธชเนเธเธเธญเธเธเธธเธ“เนเธ”เนเธ—เธฑเธเธ—เธต
        </p>

        <div className="search-field">
          <label htmlFor="order">เธซเธกเธฒเธขเน€เธฅเธ Order</label>

          <div className="search-row">
            <SearchIcon className="search-icon" />

            <input
              id="order"
              value={orderNo}
              onChange={(e) => {
                setOrderNo(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="เน€เธเนเธ ORD - 28587965432159"
              autoComplete="off"
              inputMode="text"
            />
          </div>

          <p className="format-help">
            เธเธดเธกเธเนเน€เธเธเธฒเธฐเธ•เธฑเธงเน€เธฅเธเธเนเนเธ”เน เธฃเธฐเธเธเธเธฐเธเธฑเธ”เธฃเธนเธเนเธเธเนเธซเนเธญเธฑเธ•เนเธเธกเธฑเธ•เธด
          </p>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={handleSearch}
        >
          เธเนเธเธซเธฒ
        </button>
      </section>

      <section className="page-content">
        <div className="section-heading-row">
          <h2>เธญเธญเน€เธ”เธญเธฃเนเธฅเนเธฒเธชเธธเธ”</h2>

          <button
            type="button"
            className="see-all-link"
            onClick={() => router.push("/orders")}
          >
            เธ”เธนเธ—เธฑเนเธเธซเธกเธ”
            <ChevronRightIcon className="see-all-icon" />
          </button>
        </div>

        <div className="order-list">
          {recentOrders.map((order) => (
            <OrderCard key={order.orderNo} order={order} />
          ))}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}

