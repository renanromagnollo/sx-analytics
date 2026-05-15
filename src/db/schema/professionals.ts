import {
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { salons } from "./salons";

export const professionals = pgTable("professionals", {
  id: uuid("id").defaultRandom().primaryKey(),

  salonId: uuid("salon_id")
    .references(() => salons.id)
    .notNull(),

  name: text("name").notNull(),

  active: text("active")
    .$type<"YES" | "NO">()
    .default("YES")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});