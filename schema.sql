-- Run against your D1 database:
--   npx wrangler d1 execute chillmusic --remote --file=schema.sql
--
-- This schema is destructive: it drops any existing users/preferences/sketches
-- data so the simplified shape (username + sketches only) takes effect.

DROP TABLE IF EXISTS preferences;
DROP TABLE IF EXISTS sketches;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id            TEXT    PRIMARY KEY,
  username      TEXT    UNIQUE NOT NULL,
  password_hash TEXT    NOT NULL,
  created_at    INTEGER NOT NULL
);

CREATE TABLE sketches (
  id          TEXT    PRIMARY KEY,
  user_id     TEXT    NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT    NOT NULL,
  code        TEXT    NOT NULL,
  created_at  INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL
);

CREATE INDEX idx_sketches_user ON sketches(user_id, updated_at DESC);
