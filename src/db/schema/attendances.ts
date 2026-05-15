import {
  pgTable,
  uuid,
  text,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

import { salons } from "./salons";
import { professionals } from "./professionals";

export const attendances = pgTable("attendances", {
  id: uuid("id").defaultRandom().primaryKey(),

  salonId: uuid("salon_id")
    .references(() => salons.id)
    .notNull(),

  professionalId: uuid("professional_id")
    .references(() => professionals.id)
    .notNull(),

  clientName: text("client_name"),

  totalAmount: numeric("total_amount", {
    precision: 10,
    scale: 2,
  }).notNull(),

  attendanceDate: timestamp("attendance_date").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  // 🔥 ID de idempotência (ESSENCIAL)
  importedKey: text("imported_key").unique(),
});