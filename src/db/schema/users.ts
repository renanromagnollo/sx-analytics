import {
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { salons } from "./salons";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  salonId: uuid("salon_id")
    .references(() => salons.id)
    .notNull(),

  name: text("name").notNull(),

  email: text("email").notNull().unique(),

  role: text("role")
    .$type<"ADMIN" | "MANAGER" | "USER">()
    .default("USER")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});