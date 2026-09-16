"use client";

import { useEffect, useState } from "react";
import { MonitorIcon, PhoneIcon } from "../icons";

export const VIEW_STORAGE_KEY = "khanit-view";

/**
 * ปุ่มสลับมุมมอง เดสก์ท็อป ⇄ มือถือ
 * ทำงานโดยตั้ง data-view ที่ <html> แล้วให้ CSS บังคับเลย์เอาต์มือถือทับ media query
 * ค่าที่เลือกถูกจำไว้ใน localStorage และกู้คืนก่อนหน้าจอวาดครั้งแรก (สคริปต์ใน layout.tsx)
 */
export default function ViewToggle() {
  const [mobileView, setMobileView] = useState(false);
  const [ready, setReady] = useState(false);

  // อ่านค่าที่สคริปต์ใน layout ตั้งไว้แล้ว ให้ state ตรงกับ DOM
  useEffect(() => {
    setMobileView(document.documentElement.dataset.view === "mobile");
    setReady(true);
  }, []);

  const toggle = () => {
    const next = !mobileView;
    setMobileView(next);

    document.documentElement.dataset.view = next ? "mobile" : "desktop";

    try {
      window.localStorage.setItem(VIEW_STORAGE_KEY, next ? "mobile" : "desktop");
    } catch {
      // localStorage ใช้ไม่ได้ — สลับได้อยู่ แค่ไม่ถูกจำไว้
    }
  };

  const Icon = mobileView ? MonitorIcon : PhoneIcon;
  const label = mobileView ? "มุมมองเดสก์ท็อป" : "มุมมองมือถือ";

  return (
    <button
      type="button"
      className="view-toggle"
      onClick={toggle}
      aria-pressed={ready ? mobileView : undefined}
      title={`สลับเป็น${label}`}
    >
      <Icon className="view-toggle-icon" />
      <span className="view-toggle-label">{label}</span>
    </button>
  );
}
