-- Adds restorable Layer Builder state without altering existing code-only sketches.
ALTER TABLE sketches ADD COLUMN settings TEXT;
