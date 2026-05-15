import {
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { salons }
  from "./salons";

export const products =
  pgTable(
    "products",
    {
      id: uuid("id")
        .defaultRandom()
        .primaryKey(),

      salonId: uuid("salon_id")
        .references(() => salons.id)
        .notNull(),

      name: text("name")
        .notNull(),

      costPerUnit: numeric(
        "cost_per_unit",
        {
          precision: 10,
          scale: 2,
        }
      ).notNull(),

      createdAt:
        timestamp("created_at")
          .defaultNow()
          .notNull(),
    }
  );