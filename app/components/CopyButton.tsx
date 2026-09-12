"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "../icons";

/** ปุ่มคัดลอกข้อความ ใช้ได้ทั้งในการ์ดรายการและหน้ารายละเอียด */
export default function CopyButton({
  value,
  label = "คัดลอก",
  copiedLabel = "คัดลอกแล้ว",
  compact = false,
}: {
  value: string;
  label?: string;
  copiedLabel?: string;
  /** true = แสดงเฉพาะไอคอน (ใช้ในการ์ดรายการที่พื้นที่จำกัด) */
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setFailed(false);
    } catch {
      setFailed(true);
    }

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied(false);
      setFailed(false);
    }, 1600);
  };

  const Icon = copied ? CheckIcon : CopyIcon;
  const text = failed ? "คัดลอกไม่ได้" : copied ? copiedLabel : label;

  return (
    <button
      type="button"
      className={
        "copy-pill" +
        (copied ? " copied" : "") +
        (failed ? " failed" : "") +
        (compact ? " compact" : "")
      }
      onClick={handleCopy}
      aria-label={`คัดลอกหมายเลขออเดอร์ ${value}`}
      title={`คัดลอก ${value}`}
    >
      <Icon className="copy-pill-icon" />
      {compact ? (
        <span className="sr-only">{text}</span>
      ) : (
        <span>{text}</span>
      )}
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "คัดลอกแล้ว" : failed ? "คัดลอกไม่สำเร็จ" : ""}
      </span>
    </button>
  );
}
