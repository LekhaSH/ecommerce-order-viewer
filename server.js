const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
app.use(cors());

const db = new Database(path.join(__dirname, "data/ecom.db"), { readonly: true });

// 1) Search users
app.get("/api/users", (req, res) => {
  const q = (req.query.q || "").trim();
  const like = `%${q}%`;
  const rows = db.prepare(`
    SELECT id, first_name, last_name, email, city, state
    FROM users
    WHERE ? = ''
       OR first_name LIKE ?
       OR last_name  LIKE ?
       OR email      LIKE ?
       OR city       LIKE ?
       OR state      LIKE ?
    LIMIT 50
  `).all(q, like, like, like, like, like);
  res.json(rows);
});

// 2) Orders for a user
app.get("/api/users/:id/orders", (req, res) => {
  const rows = db.prepare(`
    SELECT id, status, created_at, shipped_at, delivered_at, returned_at, num_of_item
    FROM orders
    WHERE user_id = ?
    ORDER BY datetime(created_at) DESC
  `).all(req.params.id);
  res.json(rows);
});

// 3) Items in an order
app.get("/api/orders/:id/items", (req, res) => {
  const rows = db.prepare(`
    SELECT oi.id,
           p.name AS product_name,
           p.sku, p.brand, p.category, p.retail_price,
           oi.status, oi.created_at, oi.shipped_at, oi.delivered_at, oi.returned_at
    FROM order_items oi
    JOIN products p ON p.id = oi.product_id
    WHERE oi.order_id = ?
    ORDER BY product_name
  `).all(req.params.id);
  res.json(rows);
});

const PORT = 5174;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
