import {
  pgTable,
  uuid,
  integer,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { salons } from "./salons";

export const uploads = pgTable("uploads", {
  id: uuid("id").defaultRandom().primaryKey(),

  salonId: uuid("salonId")
    .references(() => salons.id)
    .notNull(),

  fileName: varchar("fileName", { length: 255 }).notNull(),

  status: varchar("status", { length: 50 }).notNull(),

  importedRows: integer("importedRows").default(0).notNull(),

  invalidRows: integer("invalidRows").default(0).notNull(),

  errorMessage: text("errorMessage"),

  startedAt: timestamp("startedAt").defaultNow().notNull(),

  finishedAt: timestamp("finishedAt"),
});