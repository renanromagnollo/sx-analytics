ALTER TABLE "uploads" RENAME COLUMN "salonId" TO "salon_id";--> statement-breakpoint
ALTER TABLE "uploads" DROP CONSTRAINT "uploads_salonId_salons_id_fk";
--> statement-breakpoint
ALTER TABLE "uploads" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "uploads" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "uploads" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "uploads" ADD CONSTRAINT "uploads_salon_id_salons_id_fk" FOREIGN KEY ("salon_id") REFERENCES "public"."salons"("id") ON DELETE no action ON UPDATE no action;