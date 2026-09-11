"use client";

import { useRouter, usePathname } from "next/navigation";

const NAV_ITEMS: { href: string; label: string; icon?: string }[] = [
  { href: "/", label: "ติดตามออเดอร์" },
  { href: "/status", label: "สถานะ", icon: "◷" },
  { href: "/orders", label: "รายการออเดอร์" },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        return (
          <button
            key={item.href}
            type="button"
            className={isActive ? "nav-item active" : "nav-item"}
            onClick={() => router.push(item.href)}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon && <span className="clock-icon">{item.icon}</span>}
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
