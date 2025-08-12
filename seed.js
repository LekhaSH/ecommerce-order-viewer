// scripts/seed.js
const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");
const { parse } = require("csv-parse/sync");

const dbFile = path.join(__dirname, "../data/ecom.db");
const schemaFile = path.join(__dirname, "../schema.sql");
const datasetDir = path.join(__dirname, "../dataset");

// Create data folder
fs.mkdirSync(path.join(__dirname, "../data"), { recursive: true });

// Create DB connection
const db = new Database(dbFile);
db.pragma("journal_mode = WAL");

// Load CSV helper
function loadCSV(fileName) {
  const filePath = path.join(datasetDir, fileName);
  const content = fs.readFileSync(filePath);
  return parse(content, { columns: true, skip_empty_lines: true });
}

// Load schema
db.exec(fs.readFileSync(schemaFile, "utf8"));

// Seed functions
function seed(table, cols, rows) {
  const placeholders = cols.map((c) => `@${c}`).join(", ");
  const stmt = db.prepare(
    `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${placeholders})`
  );
  const tx = db.transaction((data) => {
    for (const row of data) {
      stmt.run(row);
    }
  });
  tx(rows);
}

// 1) Users
const users = loadCSV("users.csv");
seed(
  "users",
  [
    "id",
    "first_name",
    "last_name",
    "email",
    "age",
    "gender",
    "state",
    "street_address",
    "postal_code",
    "city",
    "country",
    "latitude",
    "longitude",
    "traffic_source",
    "created_at",
  ],
  users
);

// 2) Distribution Centers
const distCenters = loadCSV("distribution_centers.csv");
seed("distribution_centers", ["id", "name", "latitude", "longitude"], distCenters);

// 3) Products
const products = loadCSV("products.csv");
seed(
  "products",
  [
    "id",
    "cost",
    "category",
    "name",
    "brand",
    "retail_price",
    "department",
    "sku",
    "distribution_center_id",
  ],
  products
);

// 4) Orders
const orders = loadCSV("orders.csv").map((o) => ({
  id: o.order_id,
  user_id: o.user_id,
  status: o.status,
  gender: o.gender,
  created_at: o.created_at,
  returned_at: o.returned_at,
  shipped_at: o.shipped_at,
  delivered_at: o.delivered_at,
  num_of_item: o.num_of_item,
}));
seed(
  "orders",
  [
    "id",
    "user_id",
    "status",
    "gender",
    "created_at",
    "returned_at",
    "shipped_at",
    "delivered_at",
    "num_of_item",
  ],
  orders
);

// 5) Order Items
const orderItems = loadCSV("order_items.csv");
seed(
  "order_items",
  [
    "id",
    "order_id",
    "user_id",
    "product_id",
    "inventory_item_id",
    "status",
    "created_at",
    "shipped_at",
    "delivered_at",
    "returned_at",
  ],
  orderItems
);

// 6) Inventory Items
const inventoryItems = loadCSV("inventory_items.csv");
seed(
  "inventory_items",
  [
    "id",
    "product_id",
    "created_at",
    "sold_at",
    "cost",
    "product_category",
    "product_name",
    "product_brand",
    "product_retail_price",
    "product_department",
    "product_sku",
    "product_distribution_center_id",
  ],
  inventoryItems
);

console.log("✅ Database seeded successfully!");
