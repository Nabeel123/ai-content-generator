import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const AIOutput = pgTable("aiOuput", {
  id: serial("id").primaryKey(),
  formData: varchar("formData"),
  aiResponse: text("aiResponse"),
  templateSlug: varchar("templateSlug").notNull(),
  createdBy: varchar("createdBy"),
  createdAt: timestamp("createdAt").default(new Date()),
});

export const UserSubscription = pgTable("userSubscription", {
  id: serial("id").primaryKey(),
  email: varchar("email"),
  userName: varchar("userName"),
  active: boolean("active"),
  paymentId: varchar("paymentId"),
  joinDate: varchar("joinData"),
});
