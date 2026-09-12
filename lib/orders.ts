export type OrderStatus =
  | "queued"
  | "in_progress"
  | "awaiting_payment"
  | "completed";

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

/** ลำดับขั้นตามที่แสดงใน StepTracker บนหน้ารายละเอียด */
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

/** ข้อความบนปุ่มดำเนินการ ตามสถานะปัจจุบันของออเดอร์ */
export const NEXT_ACTION_LABEL: Record<OrderStatus, string | null> = {
  queued: "ดำเนินการถัดไป",
  in_progress: "ดำเนินการถัดไป",
  awaiting_payment: "ชำระเงินตอนนี้",
  completed: null,
};

/** คำอธิบายสั้น ๆ ว่าแต่ละสถานะหมายถึงอะไร ใช้ในหน้ารายละเอียด */
export const STATUS_DESCRIPTION: Record<OrderStatus, string> = {
  queued: "ออเดอร์เข้าคิวแล้ว รอร้านค้าเริ่มดำเนินการ",
  in_progress: "ร้านค้ากำลังเตรียมสินค้าของคุณ",
  awaiting_payment: "เตรียมสินค้าเสร็จแล้ว รอการชำระเงินจากคุณ",
  completed: "ออเดอร์เสร็จสมบูรณ์เรียบร้อยแล้ว",
};

/** ออเดอร์ที่ยังไม่จบ = ยังอยู่ระหว่างดำเนินการ (ใช้แยกแท็บในหน้ารายการออเดอร์) */
export function isActiveOrder(order: Order): boolean {
  return order.status !== "completed";
}

const STORAGE_KEY = "khanit-orders-v1";

/** หน่วงเวลาเล็กน้อยเพื่อให้ loading state ทำงานจริง และสลับไปใช้ API จริงได้ง่ายภายหลัง */
const FAKE_LATENCY_MS = 400;

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
    { name: "ถุงเท้าข้อสั้น", price: 100, quantity: 1 },
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
  const statuses: OrderStatus[] = [
    "awaiting_payment",
    "in_progress",
    "queued",
    "completed",
    "in_progress",
    "queued",
    "awaiting_payment",
    "completed",
  ];

  return statuses.map((status, index) => ({
    orderNo: `ORD - ${base}${9 - index}`,
    status,
    items: ITEM_SETS[index % ITEM_SETS.length],
    createdAt: isoDaysAgo(index, 12 - index, 34),
  }));
}

function readStore(): Order[] {
  if (typeof window === "undefined") return seedOrders();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Order[];
  } catch {
    // อ่านไม่ได้ / JSON เสีย — ตกลงไป seed ใหม่ด้านล่าง
  }

  const seeded = seedOrders();
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  } catch {
    // localStorage ใช้ไม่ได้ (โหมดส่วนตัว ฯลฯ) — ทำงานต่อในหน่วยความจำ
  }
  return seeded;
}

function writeStore(orders: Order[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // เขียนไม่ได้ก็ข้ามไป
  }
}

/** เก็บเฉพาะตัวเลข ใช้เทียบหมายเลขออเดอร์โดยไม่สนช่องว่างหรือขีด */
function digitsOnly(input: string): string {
  return input.replace(/[^0-9]/g, "");
}

/** รูปแบบมาตรฐานสำหรับแสดงผล เช่น "ORD - 12345" */
export function formatOrderNo(input: string): string {
  const digits = digitsOnly(input);
  return digits ? `ORD - ${digits}` : input.trim();
}

/** จำนวนหลักขั้นต่ำที่ถือว่าเป็นหมายเลขออเดอร์ที่พอจะค้นได้ */
export const MIN_ORDER_DIGITS = 5;

export function isValidOrderInput(input: string): boolean {
  return digitsOnly(input).length >= MIN_ORDER_DIGITS;
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
  if (!target) return undefined;
  return readStore().find((o) => digitsOnly(o.orderNo) === target);
}

export function updateOrderStatus(
  orderNo: string,
  status: OrderStatus
): Order[] {
  const orders = readStore();
  const target = digitsOnly(orderNo);
  const next = orders.map((o) =>
    digitsOnly(o.orderNo) === target ? { ...o, status } : o
  );
  writeStore(next);
  return next;
}

/** สถานะถัดไปตาม STEP_ORDER — คืน null ถ้าอยู่ขั้นสุดท้ายแล้ว */
export function nextStatus(status: OrderStatus): OrderStatus | null {
  const index = STEP_ORDER.indexOf(status);
  if (index < 0 || index >= STEP_ORDER.length - 1) return null;
  return STEP_ORDER[index + 1];
}

/** เลื่อนออเดอร์ไปขั้นถัดไป คืนออเดอร์ที่อัปเดตแล้ว (null ถ้าเลื่อนต่อไม่ได้) */
export function advanceOrder(order: Order): Order | null {
  const next = nextStatus(order.status);
  if (!next) return null;
  updateOrderStatus(order.orderNo, next);
  return { ...order, status: next };
}

export function orderTotal(order: Order): number {
  return order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

export function formatBaht(amount: number): string {
  return `${amount.toLocaleString("th-TH")} บาท`;
}

/** วันที่แบบพุทธศักราช เช่น "11 ก.ย. 2569" */
export function formatThaiDate(iso: string): string {
  return new Intl.DateTimeFormat("th-TH-u-ca-buddhist", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

/**
 * วันและเวลาแบบสั้นสำหรับการ์ดรายการออเดอร์ เช่น "21/08/2026 15:42 น."
 * ใช้ปี ค.ศ. — ถ้าต้องการ พ.ศ. ให้เปลี่ยน "th-TH" เป็น "th-TH-u-ca-buddhist"
 */
export function formatDateTimeShort(iso: string): string {
  const d = new Date(iso);

  // th-TH ใช้ปฏิทินพุทธเป็นค่าเริ่มต้น จึงต้องระบุ gregory เพื่อให้ได้ปี ค.ศ.
  const date = new Intl.DateTimeFormat("th-TH-u-ca-gregory", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);

  const time = new Intl.DateTimeFormat("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);

  return `${date} ${time} น.`;
}

/** เวลาแบบ 24 ชั่วโมง เช่น "12:34 น." */
export function formatThaiTime(iso: string): string {
  const time = new Intl.DateTimeFormat("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
  return `${time} น.`;
}

/* ---------------------------------------------------------------
 * ชั้น async — หน้าเว็บเรียกผ่านฟังก์ชันกลุ่มนี้เท่านั้น
 * เพื่อให้มี loading / error state จริง และเปลี่ยนไปต่อ API ภายหลังได้
 * โดยไม่ต้องแก้ component
 * ------------------------------------------------------------- */

export class OrderNotFoundError extends Error {
  constructor(public readonly orderNo: string) {
    super(`ไม่พบออเดอร์ ${orderNo}`);
    this.name = "OrderNotFoundError";
  }
}

export class InvalidOrderInputError extends Error {
  constructor() {
    super("รูปแบบหมายเลขออเดอร์ไม่ถูกต้อง");
    this.name = "InvalidOrderInputError";
  }
}

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(value), FAKE_LATENCY_MS)
  );
}

export function fetchAllOrders(): Promise<Order[]> {
  return delay(getAllOrders());
}

export function fetchRecentOrders(count: number): Promise<Order[]> {
  return delay(getRecentOrders(count));
}

/**
 * ค้นหาออเดอร์หนึ่งรายการ
 * - รูปแบบไม่ถูกต้อง → throw InvalidOrderInputError (error state)
 * - ไม่พบในระบบ → throw OrderNotFoundError (empty state)
 */
export async function fetchOrder(orderNo: string): Promise<Order> {
  if (!isValidOrderInput(orderNo)) {
    await delay(null);
    throw new InvalidOrderInputError();
  }

  const found = await delay(getOrder(orderNo));
  if (!found) throw new OrderNotFoundError(formatOrderNo(orderNo));

  return found;
}
