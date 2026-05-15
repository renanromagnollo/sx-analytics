import {
  numeric,
  pgTable,
  uuid,
} from "drizzle-orm/pg-core";

import { attendances } from "./attendances";
import { services } from "./services";

export const attendanceServices = pgTable(
  "attendance_services",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    attendanceId: uuid("attendance_id")
      .references(() => attendances.id)
      .notNull(),

    serviceId: uuid("service_id")
      .references(() => services.id)
      .notNull(),

    amount: numeric("amount", {
      precision: 10,
      scale: 2,
    }).notNull(),
  }
);