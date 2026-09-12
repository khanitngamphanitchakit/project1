"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "../icons";
import { NAV_ITEMS } from "./nav-items";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="top-header">
      <Link href="/" className="brand" aria-label="Order by Khanit หน้าแรก">
        <LogoMark className="logo-mark" />
        <span className="logo-word">Order by Khanit</span>
      </Link>

      {/* เมนูบนสำหรับจอกว้าง — บนมือถือซ่อนไว้ เพราะใช้แถบล่างแทน */}
      <nav className="top-nav" aria-label="เมนูหลัก">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? "top-nav-link active" : "top-nav-link"}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
