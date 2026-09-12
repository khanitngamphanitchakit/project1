"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./nav-items";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="เมนูหลัก">
      {NAV_ITEMS.map(({ href, label, Icon }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={isActive ? "nav-item active" : "nav-item"}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="nav-icon-wrap">
              <Icon className="nav-icon" />
            </span>
            <span className="nav-label">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
