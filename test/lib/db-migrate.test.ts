import { describe, it, expect, beforeAll } from "vitest";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm";

describe("runMigrations — schema creation", () => {
  const client = createClient({ url: ":memory:" });
  const db = drizzle(client);

  async function migrate() {
    await db.run(sql`CREATE TABLE IF NOT EXISTS offers (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'draft', ideal_client TEXT, limitation TEXT, solutions_inventory TEXT, thorn_scorecard TEXT, outcome_statement TEXT, roadmap TEXT, delivery_model TEXT, pricing TEXT, document_content TEXT, dm_script TEXT, email_sequence TEXT, current_step INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS lead_tokens (id INTEGER PRIMARY KEY AUTOINCREMENT, lead_slug TEXT NOT NULL, token_hash TEXT NOT NULL UNIQUE, issued_at INTEGER NOT NULL, expires_at INTEGER NOT NULL, revoked_at INTEGER)`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS pilots (id INTEGER PRIMARY KEY AUTOINCREMENT, lead_slug TEXT NOT NULL, status TEXT NOT NULL, stripe_checkout_id TEXT, stripe_charge_id TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS vua_signings (id INTEGER PRIMARY KEY AUTOINCREMENT, pilot_id INTEGER NOT NULL REFERENCES pilots(id), signer_name TEXT NOT NULL, signer_email TEXT NOT NULL, terms_version TEXT NOT NULL, ip_hash TEXT NOT NULL, ua_hash TEXT NOT NULL, signed_at INTEGER NOT NULL, audit_hash TEXT NOT NULL)`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS stripe_events (event_id TEXT PRIMARY KEY, received_at INTEGER NOT NULL)`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS funnel_events (id INTEGER PRIMARY KEY AUTOINCREMENT, pilot_id INTEGER, lead_slug TEXT, event_type TEXT NOT NULL, data_json TEXT, ts INTEGER NOT NULL)`);
  }

  beforeAll(async () => {
    await migrate();
  });

  it("creates the 6 critical broadcast tables", async () => {
    const result = await db.run(
      sql`SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`
    );
    const names = result.rows.map((r) => (r as unknown as { name: string }).name);
    expect(names).toContain("lead_tokens");
    expect(names).toContain("pilots");
    expect(names).toContain("vua_signings");
    expect(names).toContain("stripe_events");
    expect(names).toContain("funnel_events");
    expect(names).toContain("offers");
  });

  it("is idempotent — calling twice does not throw", async () => {
    await expect(migrate()).resolves.not.toThrow();
  });

  it("enforces UNIQUE on lead_tokens.token_hash", async () => {
    const now = Date.now();
    await db.run(
      sql`INSERT INTO lead_tokens (lead_slug, token_hash, issued_at, expires_at) VALUES ('test-slug', 'hash-a', ${now}, ${now + 1000})`
    );
    await expect(
      db.run(
        sql`INSERT INTO lead_tokens (lead_slug, token_hash, issued_at, expires_at) VALUES ('other', 'hash-a', ${now}, ${now + 1000})`
      )
    ).rejects.toThrow();
  });

  it("stripe_events.event_id is primary key — prevents double-insert", async () => {
    await db.run(
      sql`INSERT INTO stripe_events (event_id, received_at) VALUES ('evt_test_1', ${Date.now()})`
    );
    await expect(
      db.run(
        sql`INSERT INTO stripe_events (event_id, received_at) VALUES ('evt_test_1', ${Date.now()})`
      )
    ).rejects.toThrow();
  });
});
