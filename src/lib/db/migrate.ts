import { db } from "./index";
import { sql } from "drizzle-orm";

export function runMigrations() {
  db.run(sql`CREATE TABLE IF NOT EXISTS offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
    ideal_client TEXT,
    limitation TEXT,
    solutions_inventory TEXT,
    thorn_scorecard TEXT,
    outcome_statement TEXT,
    roadmap TEXT,
    delivery_model TEXT,
    pricing TEXT,
    document_content TEXT,
    dm_script TEXT,
    email_sequence TEXT,
    current_step INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`);

  db.run(sql`CREATE TABLE IF NOT EXISTS chat_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    offer_id INTEGER REFERENCES offers(id),
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`);
}
