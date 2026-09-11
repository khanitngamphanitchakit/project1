"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MENU_LINKS = [
  { href: "/", label: "ติดตามออเดอร์" },
  { href: "/status", label: "สถานะ" },
  { href: "/orders", label: "รายการออเดอร์" },
];

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the menu with Escape, and don't let it get stuck open
  // if the component re-renders after navigation.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const goTo = (href: string) => {
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <>
      <header className="top-header">
        <div className="status-time">08:34</div>
        <div className="phone-icons">
          <span>▮▮</span>
          <span>◔</span>
          <span>▭</span>
        </div>

        <button
          type="button"
          className="menu-icon"
          aria-label={menuOpen ? "ปิดเมนู" : "เปิดเมนู"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {menuOpen && (
        <div className="menu-overlay">
          <div
            className="menu-backdrop"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="menu-frame">
            <nav className="menu-drawer" aria-label="เมนูหลัก">
              <div className="menu-drawer-title">เมนู</div>

              <ul>
                {MENU_LINKS.map((link) => (
                  <li key={link.href}>
                    <button type="button" onClick={() => goTo(link.href)}>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
