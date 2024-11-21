import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const AIOutput = pgTable("aiOuput", {
  id: serial("id").primaryKey(),
  formData: varchar("formData"),
  aiResponse: text("aiResponse"),
  templateSlug: varchar("templateSlug").notNull(),
  createdBy: varchar("createdBy"),
  createdAt: timestamp("createdAt").default(new Date()),
});
