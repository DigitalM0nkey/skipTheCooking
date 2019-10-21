DROP TABLE IF EXISTS orders
CASCADE;

CREATE TABLE orders
(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  timestamp TIMESTAMP
);
