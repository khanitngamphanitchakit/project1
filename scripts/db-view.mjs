// ดูข้อมูลทุกตารางใน dev.db แบบอ่านอย่างเดียว: npm run db:view
import Database from "better-sqlite3";

const db = new Database("dev.db", { readonly: true });
const tables = db
  .prepare("select name from sqlite_master where type='table' and name not like 'sqlite_%' and name not like '_prisma%'")
  .all()
  .map((t) => t.name);

for (const table of tables) {
  const rows = db.prepare(`select * from "${table}"`).all();
  console.log(`\n=== ${table} (${rows.length} แถว) ===`);
  console.table(rows);
}
