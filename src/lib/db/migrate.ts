import { db } from "./index";
import { sql } from "drizzle-orm";

let migrated = false;

export async function runMigrations() {
  if (migrated) return;
  migrated = true;

  await db.run(sql`CREATE TABLE IF NOT EXISTS offers (
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

  await db.run(sql`CREATE TABLE IF NOT EXISTS chat_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    offer_id INTEGER REFERENCES offers(id),
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`);

  await db.run(sql`CREATE TABLE IF NOT EXISTS lead_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_slug TEXT NOT NULL,
    token_hash TEXT NOT NULL UNIQUE,
    issued_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    revoked_at INTEGER
  )`);
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS idx_lead_tokens_slug ON lead_tokens(lead_slug)`
  );

  await db.run(sql`CREATE TABLE IF NOT EXISTS pilots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_slug TEXT NOT NULL,
    status TEXT NOT NULL,
    stripe_checkout_id TEXT,
    stripe_charge_id TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  )`);
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS idx_pilots_slug ON pilots(lead_slug)`
  );
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS idx_pilots_stripe ON pilots(stripe_checkout_id)`
  );

  await db.run(sql`CREATE TABLE IF NOT EXISTS vua_signings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pilot_id INTEGER NOT NULL REFERENCES pilots(id),
    signer_name TEXT NOT NULL,
    signer_email TEXT NOT NULL,
    terms_version TEXT NOT NULL,
    ip_hash TEXT NOT NULL,
    ua_hash TEXT NOT NULL,
    signed_at INTEGER NOT NULL,
    audit_hash TEXT NOT NULL
  )`);
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_vua_pilot ON vua_signings(pilot_id)`
  );

  await db.run(sql`CREATE TABLE IF NOT EXISTS cofounder_tests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pilot_id INTEGER NOT NULL REFERENCES pilots(id),
    clip_a_is_clone INTEGER NOT NULL,
    sent_at INTEGER,
    result_pass INTEGER,
    decided_at INTEGER
  )`);

  await db.run(sql`CREATE TABLE IF NOT EXISTS cofounder_test_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_id INTEGER NOT NULL REFERENCES cofounder_tests(id),
    tester_email TEXT NOT NULL,
    identified_clip TEXT,
    correct INTEGER,
    submitted_at INTEGER
  )`);

  await db.run(sql`CREATE TABLE IF NOT EXISTS stripe_events (
    event_id TEXT PRIMARY KEY,
    received_at INTEGER NOT NULL
  )`);

  await db.run(sql`CREATE TABLE IF NOT EXISTS funnel_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pilot_id INTEGER,
    lead_slug TEXT,
    event_type TEXT NOT NULL,
    data_json TEXT,
    ts INTEGER NOT NULL
  )`);
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS idx_funnel_pilot_ts ON funnel_events(pilot_id, ts)`
  );
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS idx_funnel_lead_type_ts ON funnel_events(lead_slug, event_type, ts)`
  );
}
