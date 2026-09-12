"use client";

import type { ComponentType } from "react";
import { useRouter, usePathname } from "next/navigation";
import { HomeIcon, ListIcon, ClockIcon, UserIcon } from "./icons";

const NAV_ITEMS: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}[] = [
  { href: "/", label: "หน้าหลัก", icon: HomeIcon },
  { href: "/orders", label: "ออเดอร์", icon: ListIcon },
  { href: "/status", label: "สถานะ", icon: ClockIcon },
  { href: "/profile", label: "โปรไฟล์", icon: UserIcon },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="เมนูหลัก">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <button
            key={item.href}
            type="button"
            className={isActive ? "nav-item active" : "nav-item"}
            onClick={() => router.push(item.href)}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="nav-icon-wrap">
              <Icon className="nav-icon" />
            </span>
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
