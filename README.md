# Order by Khanit — ระบบติดตามออเดอร์

เว็บแอปติดตามสถานะออเดอร์ ภาษาไทย ออกแบบแบบ mobile-first (ธีมม่วง, ฟอนต์ Prompt)
ผู้ใช้กรอกหมายเลขออเดอร์ในหน้าแรก แล้วดูสถานะการจัดส่งได้เป็นขั้น ๆ

> **สถานะโปรเจกต์:** อยู่ระหว่างพัฒนา หน้าเว็บใช้งานได้บางส่วน และข้อมูลออเดอร์ยังเป็นข้อมูลตัวอย่าง
> อ่าน [สิ่งที่ยังไม่เสร็จ / ปัญหาที่รู้อยู่](#สิ่งที่ยังไม่เสร็จ--ปัญหาที่รู้อยู่) ก่อนเริ่มแก้โค้ด

---

## Tech stack

| ส่วน | ที่ใช้ |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| ภาษา | TypeScript (strict), path alias `@/*` → root |
| ฐานข้อมูล | Prisma 7 + SQLite ผ่าน adapter `@prisma/adapter-better-sqlite3` |
| Auth | NextAuth v5 (beta) — Credentials provider + bcrypt + zod |
| สไตล์ | CSS เขียนมือใน `app/globals.css` (841 บรรทัด) ใช้ CSS custom properties |

**หมายเหตุ:** `tailwindcss` v4, `shadcn` และ `@base-ui/react` ติดตั้งไว้ใน `package.json` แต่ **ยังไม่ได้ใช้จริง** —
`app/globals.css` ไม่มี `@import "tailwindcss"` และไม่มีไฟล์ไหน import `components/ui/*` เลย
ถ้าจะเริ่มใช้ Tailwind ต้องเพิ่ม `@import "tailwindcss";` ที่บรรทัดแรกของ `app/globals.css` เอง

---

## เริ่มต้นใช้งาน

ต้องมี Node.js 20+ และ npm

### ดูหน้าเว็บอย่างเดียว (ไม่ต้องตั้งฐานข้อมูล)

ข้อมูลออเดอร์ทั้งหมดอยู่ใน `localStorage` ของเบราว์เซอร์ ไม่ได้มาจากฐานข้อมูล
ดังนั้นถ้าแค่อยากดู/แก้หน้าเว็บ ทำสองขั้นนี้พอ:

```bash
npm install
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

### ตั้งฐานข้อมูล (จำเป็นเฉพาะเวลาทำระบบ login)

```bash
# 1. Prisma 7 ไม่โหลด .env ให้อัตโนมัติแล้ว และ prisma7.config.ts import "dotenv/config"
npm i -D dotenv

# 2. สร้างไฟล์ .env ที่ root (ไม่มี .env.example ในโปรเจกต์)
#    DATABASE_URL="file:./dev.db"
#    AUTH_SECRET="..."   <- สร้างด้วย: npx auth secret

# 3. สร้าง Prisma Client (ต้องทำครั้งแรก เพราะ lib/generated/prisma อยู่ใน .gitignore)
npm run db:generate

# 4. สร้างตารางใน dev.db
npm run db:migrate

# 5. ใส่ผู้ใช้ทดสอบ
npm run db:seed

# 6. ตรวจว่าข้อมูลเข้าแล้ว
npm run db:view
```

ผู้ใช้ทดสอบจาก `prisma/seed.ts` — `test@example.com` / `password123`
(ยังล็อกอินไม่ได้ ดู [สิ่งที่ยังไม่เสร็จ](#สิ่งที่ยังไม่เสร็จ--ปัญหาที่รู้อยู่))

---

## npm scripts

| คำสั่ง | ทำอะไร |
|---|---|
| `npm run dev` | รัน dev server ที่ port 3000 |
| `npm run build` | `prisma generate` แล้ว build production |
| `npm run start` | รัน production build (ต้อง `build` ก่อน) |
| `npm run lint` | ESLint (Next.js 16 ไม่มี `next lint` แล้ว จึงเรียก `eslint` ตรง ๆ) |
| `npm run db:generate` | สร้าง Prisma Client ไปที่ `lib/generated/prisma` |
| `npm run db:migrate` | `prisma migrate dev` — สร้าง/อัปเดตตารางใน `dev.db` |
| `npm run db:seed` | รัน `prisma/seed.ts` เพิ่มผู้ใช้ทดสอบ (upsert รันซ้ำได้) |
| `npm run db:view` | พิมพ์ทุกตารางใน `dev.db` ออกมาดู (อ่านอย่างเดียว) |

คำสั่ง `db:migrate` และ `db:seed` ต้องส่ง `--config ./prisma7.config.ts` เพราะไฟล์ config
ไม่ได้ชื่อ `prisma.config.ts` ที่ Prisma 7 มองหาเอง — `datasource.url` และคำสั่ง seed อยู่ในไฟล์นั้น
และ `prisma/schema.prisma` ไม่ได้ระบุ `url` ในบล็อก `datasource`

---

## โครงสร้างโปรเจกต์

ไฟล์ที่ **ใช้งานจริง** (เข้าถึงได้จาก route):

```
app/
├── layout.tsx              root layout — ฟอนต์ Prompt, lang="th", metadata
├── globals.css             สไตล์ทั้งหมดของแอป (CSS custom properties)
├── page.tsx                / — หน้าค้นหาออเดอร์ + ออเดอร์ล่าสุด 3 รายการ
├── icons.tsx               SVG icon 15 ตัว (SearchIcon, OrderIcon, ...)
├── StatusBadge.tsx         ป้ายสถานะสีตามสถานะออเดอร์
├── components/
│   ├── Header.tsx          header + เมนู (ปิดด้วย Escape)
│   ├── BottomNav.tsx       แถบนำทางล่างแบบ mobile
│   └── OrderCard.tsx       การ์ดออเดอร์ในลิสต์ กดแล้วไปหน้า /status
├── status/
│   ├── page.tsx            /status — หน้าแสดงสถานะ
│   └── orders.ts           แหล่งข้อมูลออเดอร์ทั้งหมด (localStorage)
└── orders/page.tsx         /orders — พังอยู่ ดูหัวข้อด้านล่าง

auth.ts                     NextAuth instance (แตะฐานข้อมูล)
auth.config.ts              config ส่วนเบา ใช้ร่วมกับ proxy.ts
proxy.ts                    middleware — Next.js 16 ใช้ชื่อ proxy.ts
lib/prisma.ts               Prisma Client singleton
prisma/schema.prisma        schema — มีแค่ model User
prisma/seed.ts              ผู้ใช้ทดสอบ
prisma7.config.ts           Prisma CLI config
scripts/db-view.mjs         ดูข้อมูลใน dev.db
```

### ไฟล์ค้างจากการจัดโครงสร้างใหม่

ไฟล์กลุ่มนี้ **ไม่ถูก import จากที่ไหนเลย** เป็นของเหลือจากการย้าย/จัดโฟลเดอร์ใหม่ ลบได้ปลอดภัย:

- `components/app/` — สำเนาเก่าของ `app/`
- `components/Header.tsx` — จริง ๆ เป็นสำเนาของหน้า Home ตั้งชื่อผิด
- `components/ui/` — shadcn components (button, card, input, label) ยังไม่มีใครใช้
- `app/mnt/user-data/outputs/app/` — โฟลเดอร์ที่หลุดมาจาก path ของเครื่องอื่น
- `app/BottomNav.tsx`, `app/Header.tsx`, `app/StepTracker.tsx` — เวอร์ชันเก่าของไฟล์ใน `app/components/`
- `prisma/prisma.ts`, `prisma/prisma_fixed.ts`, `prisma/package_fixed.json` — ไฟล์ซ้ำ
- `page.tsx` และ `cd` ที่ root — ไฟล์ว่าง 0 ไบต์

---

## ข้อมูลออเดอร์มาจากไหน

ทั้งหมดอยู่ใน [`app/status/orders.ts`](app/status/orders.ts) — เป็น mock store บน `localStorage`
**ยังไม่ได้ผูกกับ Prisma เลย** (`schema.prisma` มีแค่ model `User` ไม่มี `Order`)

- **key ใน localStorage:** `khanit-orders-v1`
- **ข้อมูลตั้งต้น:** 5 ออเดอร์ สร้างอัตโนมัติครั้งแรกที่เปิดเว็บ ล้าง localStorage แล้วจะ seed ใหม่
- **รูปแบบหมายเลข:** `ORD - <ตัวเลข>` เช่น `ORD - 28587965432159`
  ค้นหาโดยเทียบเฉพาะตัวเลข (เว้นวรรค/ขีดไม่มีผล) และต้องมีตัวเลข **อย่างน้อย 5 หลัก**
- **สถานะ 4 ขั้น:**

  | ค่า | ป้ายที่แสดง |
  |---|---|
  | `queued` | อยู่ในคิว |
  | `in_progress` | กำลังดำเนินการ |
  | `awaiting_payment` | รอชำระเงิน |
  | `completed` | เสร็จสิ้น |

ฟังก์ชันที่ export ไว้แล้ว — ใช้ซ้ำได้ ไม่ต้องเขียนใหม่:

`getAllOrders()` · `getRecentOrders(n)` · `getOrder(orderNo)` · `updateOrderStatus(orderNo, status)` ·
`orderTotal(order)` · `isValidOrderInput(input)` · `formatOrderNo(input)` ·
`formatBaht(amount)` · `formatThaiDate(iso)` (พ.ศ. เช่น "11 ก.ย. 2569") · `formatThaiTime(iso)`

ถ้าจะย้ายไปใช้ฐานข้อมูลจริง ให้เพิ่ม model `Order`/`OrderItem` ใน `prisma/schema.prisma`
แล้วเปลี่ยนเฉพาะไฟล์นี้ — หน้าเว็บเรียกผ่านฟังก์ชันข้างบนทั้งหมดอยู่แล้ว

---

## ระบบ Auth

ชิ้นส่วนที่มีแล้ว:

| ไฟล์ | หน้าที่ |
|---|---|
| [`auth.config.ts`](auth.config.ts) | config ส่วนเบา ไม่แตะฐานข้อมูล — session แบบ JWT, ป้องกัน `/dashboard` และ `/admin`, ล็อกอินแล้วเข้า `/login` จะเด้งไป `/dashboard` |
| [`auth.ts`](auth.ts) | Credentials provider — validate ด้วย zod, หา user ด้วย Prisma, เทียบรหัสด้วย `bcrypt.compare` |
| [`proxy.ts`](proxy.ts) | รันทุก request ยกเว้น static/API — **Next.js 16 ใช้ชื่อ `proxy.ts` แทน `middleware.ts`** |
| [`prisma/seed.ts`](prisma/seed.ts) | ผู้ใช้ทดสอบ `test@example.com` / `password123` |

เหตุผลที่แยก `auth.config.ts` ออกจาก `auth.ts`: `proxy.ts` รันก่อนทุก request จึง import ตัวที่ไม่มี Prisma

---

## สิ่งที่ยังไม่เสร็จ / ปัญหาที่รู้อยู่

1. **ข้อความไทยในหน้าแรกเพี้ยน** — [`app/page.tsx`](app/page.tsx) เก็บข้อความไทยเป็น mojibake
   (UTF-8 ถูกอ่านเป็น CP874 แล้ว encode กลับเป็น UTF-8 อีกรอบ) หน้าแรกจึงแสดง `เธเธฃเธธ...`
   ไฟล์อื่นทั้งโปรเจกต์ปกติ — แก้ได้ด้วยการพิมพ์ข้อความในไฟล์นี้ใหม่แล้วบันทึกเป็น UTF-8
2. **`/orders` พัง** — [`app/orders/page.tsx`](app/orders/page.tsx) default-export component ชื่อ `OrderCard`
   (ไม่ใช่ page) และ `import ... from "../orders"` ชี้กลับมาที่โฟลเดอร์ตัวเอง
   เนื้อหาซ้ำกับ `app/components/OrderCard.tsx` — ต้องเขียนเป็นหน้าลิสต์ออเดอร์จริง โดยเรียก `getAllOrders()`
3. **ล็อกอินยังใช้งานไม่ได้** — ไม่มี `app/api/auth/[...nextauth]/route.ts` (ไม่มีโฟลเดอร์ `app/api` เลย)
   และไม่มีหน้า `/login` กับ `/dashboard` ที่ `auth.config.ts` อ้างถึง
4. **`prisma7.config.ts` ควรเปลี่ยนชื่อเป็น `prisma.config.ts`** เพื่อให้ Prisma 7 หาเจอเอง
   ตอนนี้ต้องส่ง `--config ./prisma7.config.ts` ทุกครั้ง (scripts ในโปรเจกต์ส่งให้แล้ว)
5. **`dotenv` ไม่อยู่ใน `devDependencies`** แต่ `prisma7.config.ts` `import "dotenv/config"` —
   Prisma 7 เลิกโหลด `.env` ให้อัตโนมัติแล้ว ต้อง `npm i -D dotenv` เอง
6. **ไม่มี `.env.example`** — ตัวแปรที่ต้องมี: `DATABASE_URL`, `AUTH_SECRET`
7. **`app/StatusView.tsx`** เป็นหน้า status เวอร์ชันสมบูรณ์กว่า `/status` ที่ใช้อยู่ (มี step tracker, ปุ่มคัดลอก, ยอดรวม)
   แต่ import พัง (`../lib/orders`, `../components/StepTracker`, `../components/icons` ไม่มีจริง) จึงเข้าถึงไม่ได้
   ถ้าจะเอามาใช้ ต้องแก้ path ให้ตรงกับไฟล์ที่มีอยู่
8. **ไฟล์มี BOM 3 ไฟล์** — `app/page.tsx`, `app/components/OrderCard.tsx`, `app/StatusBadge.tsx`

---

## หมายเหตุสำหรับ AI agent

- [`AGENTS.md`](AGENTS.md) — Next.js เวอร์ชันนี้มี breaking changes จากที่โมเดลเคยเห็น
  **ต้องอ่าน guide ที่เกี่ยวข้องใน `node_modules/next/dist/docs/` ก่อนเขียนโค้ด** (บล็อกนี้ `next dev` เขียนให้เอง)
- [`CLAUDE.md`](CLAUDE.md) — มีแค่ `@AGENTS.md` (อ้างถึงไฟล์ข้างบน)
- [`.agents/skills/`](.agents/skills/) — Prisma skills 9 ชุด (CLI, Client API, upgrade v7, ฯลฯ) ล็อกเวอร์ชันไว้ใน [`skills-lock.json`](skills-lock.json)
