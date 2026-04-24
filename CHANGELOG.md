# Changelog

All notable changes to Gravity Broadcast are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-04-24

### Changed
- Offer reframe from free pilot to **$497 refundable paid pilot**. Founders now pay upfront via Stripe; pilot fee is refunded in full if the Cofounder Test fails, or credits to month 1 if it passes. Month 1 effective cost capped at $997 total.
- Hero leads on voice fidelity ("Your voice. Your takes. Your podcast.") instead of volume ("5 min in, 20 assets out"). Sub-stats updated: 5 channels, ~15 assets/week.
- Cadence unified to MWF (Mon/Wed/Fri) across all surfaces. Prior "daily podcast" overclaim removed from metadata and hero.
- Scarcity unified to "3 pilot slots · April 2026" across hero, CTA, and metadata. Prior values (5 slots, 10 founders, 3-already-claimed) were mutually inconsistent.
- Guarantee now centers on the **Cofounder Test**: 3 blind listeners receive a 30-second A/B clip; if 2 of 3 correctly identify the clone, Gravity refunds and deletes the voice model.
- `/broadcast/[slug]` per-lead mailto updated to reference the paid pilot.
- Database layer migrated from `better-sqlite3` (sync, local-file, Vercel-ephemeral) to `@libsql/client` (async, Turso-compatible). Same Drizzle query surface, SQLite syntax preserved. Local dev uses `file:gravity.db`; production requires `DATABASE_URL` + `DATABASE_AUTH_TOKEN` env vars.

### Added
- Voice Usage Agreement v1 at `docs/voice-usage-agreement.md` — one-page ESIGN-compliant consent framework covering voice cloning, Cofounder Test mechanic, deletion timelines, refund policy, audit trail. Flagged for licensed-attorney review before client #11.
- Seven new database tables for the paid-pilot funnel: `lead_tokens` (14-day gated per-lead URLs), `pilots` (funnel state machine with UNIQUE stripe_checkout_id), `vua_signings` (click-to-agree audit trail with content hash, unique on pilot+version for legitimate re-signs), `cofounder_tests` + `cofounder_test_results` (blind A/B scoring with ballot-stuff prevention), `stripe_events` (webhook idempotency dedupe), `funnel_events` (conversion logging).
- Test infrastructure: Vitest + jsdom + @testing-library for unit/component tests, Playwright scaffolded for Week 2 E2E. Nine initial tests covering critical migration paths and hero copy reframe. Scripts: `npm test`, `npm run test:watch`, `npm run test:e2e`.
- FAQ entry explaining the paid pilot rationale ("free pilots require runway we don't have; $497 covers production, fully refundable").

### Fixed
- `runMigrations()` now sets the `migrated` flag only after all DDL succeeds, with an in-flight promise to prevent concurrent cold-start requests from racing through migrations redundantly. Prior implementation silently skipped migrations on every subsequent request if the first call failed.
- `offers/[id]` API routes now validate `id` is a positive integer before querying. Prior `parseInt(id)` would coerce `"123abc"` to `123` and `"nope"` to `NaN`, causing silent wrong-data returns or query errors.
- Build no longer uses `--turbopack` flag (libsql's hrana-client ships non-JS files that trip Turbopack's ECMAScript parser). Dev stays on turbopack for speed; production build uses webpack. Both produce identical output.

### Removed
- TikTok as a distribution channel. It signals "agency that doesn't get us" to Web3 founder ICP. Telegram remains. Five honest channels across hero, multichannel, social-proof, and metadata.
- `better-sqlite3` and `@types/better-sqlite3` dependencies.

### Security
- Runtime assertion that `DATABASE_URL` is set to a remote libsql URL in production (guarded against build phase). Prevents accidentally deploying with ephemeral-filesystem fallback.
- `UNIQUE` constraint on `pilots.stripe_checkout_id` prevents Stripe webhook retries from creating duplicate paid-pilot rows.
- `UNIQUE (test_id, tester_email)` on `cofounder_test_results` prevents one tester from stuffing the ballot and flipping a Cofounder Test result.
- `UNIQUE (pilot_id, terms_version)` on `vua_signings` allows legitimate re-signs on new VUA versions while still preventing same-version double-submit.

## [0.1.0] - 2026-04-21

Initial launch of the Gravity Broadcast marketing site and Offer Builder dashboard.
