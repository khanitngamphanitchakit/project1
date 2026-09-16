import type { ComponentType } from "react";
import { ClockIcon, HomeIcon, ListIcon, UserIcon } from "../icons";

export interface NavItem {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}

/** ใช้ร่วมกันทั้งเมนูบน (จอกว้าง) และแถบล่าง (มือถือ) */
export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "รายการออเดอร์", Icon: HomeIcon },
  { href: "/orders", label: "สถานะออเดอร์", Icon: ListIcon },
  { href: "/profile", label: "โปรไฟล์", Icon: UserIcon },
];
