PRAGMA foreign_keys = ON;

-- 1) users.csv
CREATE TABLE IF NOT EXISTS users (
  id              INTEGER PRIMARY KEY,
  first_name      TEXT,
  last_name       TEXT,
  email           TEXT,
  age             INTEGER,
  gender          TEXT,
  state           TEXT,
  street_address  TEXT,
  postal_code     TEXT,
  city            TEXT,
  country         TEXT,
  latitude        REAL,
  longitude       REAL,
  traffic_source  TEXT,
  created_at      TEXT
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_name ON users(first_name, last_name);
CREATE INDEX IF NOT EXISTS idx_users_city_state ON users(city, state);

-- 2) products.csv
CREATE TABLE IF NOT EXISTS products (
  id                      INTEGER PRIMARY KEY,
  cost                    REAL,
  category                TEXT,
  name                    TEXT,
  brand                   TEXT,
  retail_price            REAL,
  department              TEXT,
  sku                     TEXT,
  distribution_center_id  INTEGER,
  FOREIGN KEY (distribution_center_id) REFERENCES distribution_centers(id)
);

CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);

-- 3) orders.csv  (order_id in CSV -> id here)
CREATE TABLE IF NOT EXISTS orders (
  id           INTEGER PRIMARY KEY,
  user_id      INTEGER NOT NULL,
  status       TEXT,
  gender       TEXT,
  created_at   TEXT,
  returned_at  TEXT,
  shipped_at   TEXT,
  delivered_at TEXT,
  num_of_item  INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);

-- 4) order_items.csv
CREATE TABLE IF NOT EXISTS order_items (
  id                INTEGER PRIMARY KEY,
  order_id          INTEGER NOT NULL,
  user_id           INTEGER NOT NULL,
  product_id        INTEGER NOT NULL,
  inventory_item_id INTEGER,
  status            TEXT,
  created_at        TEXT,
  shipped_at        TEXT,
  delivered_at      TEXT,
  returned_at       TEXT,
  FOREIGN KEY (order_id)   REFERENCES orders(id),
  FOREIGN KEY (user_id)    REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

-- 5) inventory_items.csv
CREATE TABLE IF NOT EXISTS inventory_items (
  id                              INTEGER PRIMARY KEY,
  product_id                      INTEGER NOT NULL,
  created_at                      TEXT,
  sold_at                         TEXT,
  cost                            REAL,
  product_category                TEXT,
  product_name                    TEXT,
  product_brand                   TEXT,
  product_retail_price            REAL,
  product_department              TEXT,
  product_sku                     TEXT,
  product_distribution_center_id  INTEGER,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE INDEX IF NOT EXISTS idx_inventory_product ON inventory_items(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_sold_at ON inventory_items(sold_at);

-- 6) distribution_centers.csv
CREATE TABLE IF NOT EXISTS distribution_centers (
  id        INTEGER PRIMARY KEY,
  name      TEXT,
  latitude  REAL,
  longitude REAL
);
