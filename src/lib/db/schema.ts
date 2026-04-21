import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const offers = sqliteTable("offers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  status: text("status", { enum: ["draft", "ready", "launched"] })
    .notNull()
    .default("draft"),
  idealClient: text("ideal_client"),
  limitation: text("limitation"),
  solutionsInventory: text("solutions_inventory"),
  thornScorecard: text("thorn_scorecard"),
  outcomeStatement: text("outcome_statement"),
  roadmap: text("roadmap"),
  deliveryModel: text("delivery_model"),
  pricing: text("pricing"),
  documentContent: text("document_content"),
  dmScript: text("dm_script"),
  emailSequence: text("email_sequence"),
  currentStep: integer("current_step").notNull().default(1),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const chatMessages = sqliteTable("chat_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  offerId: integer("offer_id").references(() => offers.id),
  role: text("role", { enum: ["user", "assistant", "system"] }).notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const leadTokens = sqliteTable("lead_tokens", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  leadSlug: text("lead_slug").notNull(),
  tokenHash: text("token_hash").notNull().unique(),
  issuedAt: integer("issued_at").notNull(),
  expiresAt: integer("expires_at").notNull(),
  revokedAt: integer("revoked_at"),
});

export const pilots = sqliteTable("pilots", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  leadSlug: text("lead_slug").notNull(),
  status: text("status", {
    enum: [
      "intake_booked",
      "vua_signed",
      "paid",
      "in_production",
      "test_sent",
      "passed",
      "failed",
      "refunded",
      "autopilot",
      "churned",
    ],
  }).notNull(),
  stripeCheckoutId: text("stripe_checkout_id"),
  stripeChargeId: text("stripe_charge_id"),
  createdAt: integer("created_at").notNull(),
  updatedAt: integer("updated_at").notNull(),
});

export const vuaSignings = sqliteTable("vua_signings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  pilotId: integer("pilot_id")
    .notNull()
    .references(() => pilots.id),
  signerName: text("signer_name").notNull(),
  signerEmail: text("signer_email").notNull(),
  termsVersion: text("terms_version").notNull(),
  ipHash: text("ip_hash").notNull(),
  uaHash: text("ua_hash").notNull(),
  signedAt: integer("signed_at").notNull(),
  auditHash: text("audit_hash").notNull(),
});

export const cofounderTests = sqliteTable("cofounder_tests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  pilotId: integer("pilot_id")
    .notNull()
    .references(() => pilots.id),
  clipAIsClone: integer("clip_a_is_clone", { mode: "boolean" }).notNull(),
  sentAt: integer("sent_at"),
  resultPass: integer("result_pass", { mode: "boolean" }),
  decidedAt: integer("decided_at"),
});

export const cofounderTestResults = sqliteTable("cofounder_test_results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  testId: integer("test_id")
    .notNull()
    .references(() => cofounderTests.id),
  testerEmail: text("tester_email").notNull(),
  identifiedClip: text("identified_clip", { enum: ["A", "B"] }),
  correct: integer("correct", { mode: "boolean" }),
  submittedAt: integer("submitted_at"),
});

export const stripeEvents = sqliteTable("stripe_events", {
  eventId: text("event_id").primaryKey(),
  receivedAt: integer("received_at").notNull(),
});

export const funnelEvents = sqliteTable("funnel_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  pilotId: integer("pilot_id"),
  leadSlug: text("lead_slug"),
  eventType: text("event_type", {
    enum: [
      "page_view",
      "demo_play",
      "cal_booking",
      "intake_held",
      "vua_signed",
      "stripe_capture",
      "stripe_refund",
      "test_sent",
      "test_result",
      "autopilot_start",
      "churn",
    ],
  }).notNull(),
  dataJson: text("data_json"),
  ts: integer("ts").notNull(),
});

export type Offer = typeof offers.$inferSelect;
export type NewOffer = typeof offers.$inferInsert;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type NewChatMessage = typeof chatMessages.$inferInsert;
export type LeadToken = typeof leadTokens.$inferSelect;
export type NewLeadToken = typeof leadTokens.$inferInsert;
export type Pilot = typeof pilots.$inferSelect;
export type NewPilot = typeof pilots.$inferInsert;
export type VuaSigning = typeof vuaSignings.$inferSelect;
export type NewVuaSigning = typeof vuaSignings.$inferInsert;
export type CofounderTest = typeof cofounderTests.$inferSelect;
export type CofounderTestResult = typeof cofounderTestResults.$inferSelect;
export type FunnelEvent = typeof funnelEvents.$inferSelect;
export type NewFunnelEvent = typeof funnelEvents.$inferInsert;
