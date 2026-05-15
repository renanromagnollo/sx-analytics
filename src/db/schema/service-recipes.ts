import {
  numeric,
  pgTable,
  uuid,
} from "drizzle-orm/pg-core";

import { products }
  from "./products";

import { services }
  from "./services";

export const serviceRecipes =
  pgTable(
    "service_recipes",
    {
      id: uuid("id")
        .defaultRandom()
        .primaryKey(),

      serviceId: uuid("service_id")
        .references(() => services.id)
        .notNull(),

      productId: uuid("product_id")
        .references(() => products.id)
        .notNull(),

      quantity: numeric(
        "quantity",
        {
          precision: 10,
          scale: 2,
        }
      ).notNull(),
    }
  );