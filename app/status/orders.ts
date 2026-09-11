export type OrderStatus = "queued" | "in_progress" | "awaiting_payment" | "completed";

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  orderNo: string;
  status: OrderStatus;
  items: OrderItem[];
  /** ISO timestamp */
  createdAt: string;
}

/** Order of steps as shown in the tracker on the status page. */
export const STEP_ORDER: OrderStatus[] = [
  "queued",
  "in_progress",
  "awaiting_payment",
  "completed",
];

export const STATUS_LABEL: Record<OrderStatus, string> = {
  queued: "อยู่ในคิว",
  in_progress: "กำลังดำเนินการ",
  awaiting_payment: "รอชำระเงิน",
  completed: "เสร็จสิ้น",
};

const STORAGE_KEY = "khanit-orders-v1";

function isoDaysAgo(daysAgo: number, hh: number, mm: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hh, mm, 0, 0);
  return d.toISOString();
}

const ITEM_SETS: OrderItem[][] = [
  [
    { name: "เสื้อยืดคอกลม สีขาว", price: 100, quantity: 1 },
    { name: "กางเกงขาสั้น ผ้าฝ้าย", price: 100, quantity: 1 },
    { name: "หมวกแก๊ปปัก", price: 100, quantity: 1 },
    { name: "ถุงเท้าข้อสั้น", price: 189, quantity: 1 },
  ],
  [
    { name: "กระเป๋าผ้าแคนวาส", price: 250, quantity: 1 },
    { name: "พวงกุญแจหนัง", price: 90, quantity: 2 },
  ],
  [
    { name: "แก้วเก็บความเย็น 500ml", price: 220, quantity: 1 },
    { name: "หลอดสแตนเลส", price: 39, quantity: 2 },
  ],
  [{ name: "เสื้อฮู้ดสีเทา", price: 590, quantity: 1 }],
];

function seedOrders(): Order[] {
  const base = "2858796543215";
  return [
    {
      orderNo: `ORD - ${base}9`,
      status: "awaiting_payment",
      items: ITEM_SETS[0],
      createdAt: isoDaysAgo(0, 12, 34),
    },
    {
      orderNo: `ORD - ${base}8`,
      status: "in_progress",
      items: ITEM_SETS[1],
      createdAt: isoDaysAgo(1, 9, 12),
    },
    {
      orderNo: `ORD - ${base}7`,
      status: "queued",
      items: ITEM_SETS[2],
      createdAt: isoDaysAgo(2, 18, 5),
    },
    {
      orderNo: `ORD - ${base}6`,
      status: "completed",
      items: ITEM_SETS[3],
      createdAt: isoDaysAgo(6, 14, 40),
    },
    {
      orderNo: `ORD - ${base}5`,
      status: "completed",
      items: ITEM_SETS[0],
      createdAt: isoDaysAgo(11, 10, 0),
    },
  ];
}

function readStore(): Order[] {
  if (typeof window === "undefined") return seedOrders();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Order[];
  } catch {
    // fall through to reseed
  }

  const seeded = seedOrders();
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  } catch {
    // localStorage unavailable (private mode, etc.) — continue in-memory
  }
  return seeded;
}

function writeStore(orders: Order[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // ignore write failures
  }
}

/** Keep only digits, for comparing/looking up order numbers regardless of spacing/dashes. */
function digitsOnly(input: string): string {
  return input.replace(/[^0-9]/g, "");
}

/** Canonical display form, e.g. "ORD - 12345". */
export function formatOrderNo(input: string): string {
  const digits = digitsOnly(input);
  return digits ? `ORD - ${digits}` : input.trim();
}

/** A search string is worth looking up once it contains a plausible order number. */
export function isValidOrderInput(input: string): boolean {
  return digitsOnly(input).length >= 5;
}

export function getAllOrders(): Order[] {
  return [...readStore()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getRecentOrders(count: number): Order[] {
  return getAllOrders().slice(0, count);
}

export function getOrder(orderNo: string): Order | undefined {
  const target = digitsOnly(orderNo);
  return readStore().find((o) => digitsOnly(o.orderNo) === target);
}

export function updateOrderStatus(orderNo: string, status: OrderStatus): Order[] {
  const orders = readStore();
  const target = digitsOnly(orderNo);
  const next = orders.map((o) =>
    digitsOnly(o.orderNo) === target ? { ...o, status } : o
  );
  writeStore(next);
  return next;
}

export function orderTotal(order: Order): number {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function formatBaht(amount: number): string {
  return `${amount.toLocaleString("th-TH")} บาท`;
}

/** Thai Buddhist-era date, e.g. "11 ก.ย. 2569". */
export function formatThaiDate(iso: string): string {
  return new Intl.DateTimeFormat("th-TH-u-ca-buddhist", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

/** 24-hour clock time, e.g. "12:34 น." */
export function formatThaiTime(iso: string): string {
  const time = new Intl.DateTimeFormat("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
  return `${time} น.`;
}
