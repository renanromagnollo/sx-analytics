import {
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { salons } from "./salons";

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),

  salonId: uuid("salon_id")
    .references(() => salons.id)
    .notNull(),

  name: text("name").notNull(),

  category: text("category"),

  defaultPrice: numeric("default_price", {
    precision: 10,
    scale: 2,
  }),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});