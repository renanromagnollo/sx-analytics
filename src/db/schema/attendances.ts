import {
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { professionals } from "./professionals";
import { salons } from "./salons";

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

  commissionAmount: numeric("commission_amount", {
    precision: 10,
    scale: 2,
  }),

  attendanceDate: timestamp("attendance_date")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});