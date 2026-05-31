// Inspect the "Blog Posts" sheet specifically.
import xlsx from "xlsx";
const { readFile, utils } = xlsx;

const wb = readFile("./src/Blogs and Blog Posts.xlsx");
const sheet = wb.Sheets["Blog Posts"];
const rows = utils.sheet_to_json(sheet, { defval: null });

console.log("Total rows:", rows.length);
console.log("\n=== Real columns (non-empty) ===");
const realCols = Object.keys(rows[0]).filter((k) => !k.startsWith("__EMPTY"));
console.log(realCols);

console.log("\n=== Sample row 1 (first 12 fields) ===");
const sample = rows[0];
let i = 0;
for (const [k, v] of Object.entries(sample)) {
  if (k.startsWith("__EMPTY")) continue;
  if (i++ >= 12) break;
  const display =
    typeof v === "string" && v.length > 200 ? v.slice(0, 200) + "…" : v;
  console.log(`${k}:`, display);
}

console.log("\n=== Sample row last ===");
const last = rows[rows.length - 1];
for (const [k, v] of Object.entries(last)) {
  if (k.startsWith("__EMPTY")) continue;
  const display =
    typeof v === "string" && v.length > 200 ? v.slice(0, 200) + "…" : v;
  console.log(`${k}:`, display);
}

console.log("\n=== Handle uniqueness check ===");
const handleKey = realCols.find((c) => c.toLowerCase() === "handle");
if (handleKey) {
  const seen = new Set();
  const dupes = [];
  for (const r of rows) {
    const h = r[handleKey];
    if (!h) continue;
    if (seen.has(h)) dupes.push(h);
    seen.add(h);
  }
  console.log("Unique handles:", seen.size);
  console.log("Duplicates:", dupes.length, dupes.slice(0, 5));
}
