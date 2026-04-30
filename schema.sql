-- Run against your D1 database:
--   npx wrangler d1 execute chillmusic --remote --file=schema.sql

CREATE TABLE IF NOT EXISTS users (
  id          TEXT    PRIMARY KEY,
  email       TEXT    UNIQUE NOT NULL,
  password_hash TEXT  NOT NULL,
  created_at  INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS preferences (
  user_id     TEXT    PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  bpm         INTEGER NOT NULL DEFAULT 130,
  active_layers TEXT  NOT NULL DEFAULT '[]',
  layer_params  TEXT  NOT NULL DEFAULT '{}',
  updated_at  INTEGER NOT NULL
);
