import {
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { salons } from "./salons";

export const uploads = pgTable("uploads", {
  id: uuid("id").defaultRandom().primaryKey(),

  salonId: uuid("salon_id")
    .references(() => salons.id)
    .notNull(),

  fileName: text("file_name").notNull(),

  fileType: text("file_type").notNull(),

  status: text("status")
    .$type<
      "PENDING" |
      "PROCESSING" |
      "SUCCESS" |
      "ERROR"
    >()
    .default("PENDING")
    .notNull(),

  uploadedAt: timestamp("uploaded_at")
    .defaultNow()
    .notNull(),
});