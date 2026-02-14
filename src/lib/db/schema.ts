import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const offers = sqliteTable("offers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  status: text("status", { enum: ["draft", "ready", "launched"] })
    .notNull()
    .default("draft"),
  idealClient: text("ideal_client"),
  limitation: text("limitation"),
  solutionsInventory: text("solutions_inventory"), // JSON string
  thornScorecard: text("thorn_scorecard"), // JSON string
  outcomeStatement: text("outcome_statement"),
  roadmap: text("roadmap"), // JSON string
  deliveryModel: text("delivery_model"), // JSON string
  pricing: text("pricing"), // JSON string
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

export type Offer = typeof offers.$inferSelect;
export type NewOffer = typeof offers.$inferInsert;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type NewChatMessage = typeof chatMessages.$inferInsert;
