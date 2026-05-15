CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"salon_id" uuid NOT NULL,
	"name" text NOT NULL,
	"cost_per_unit" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_recipes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "uploads" RENAME COLUMN "file_name" TO "fileName";--> statement-breakpoint
ALTER TABLE "uploads" DROP CONSTRAINT "uploads_salon_id_salons_id_fk";
--> statement-breakpoint
ALTER TABLE "uploads" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "uploads" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "uploads" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "uploads_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "uploads" ALTER COLUMN "status" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "uploads" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "uploads" ADD COLUMN "salonId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "uploads" ADD COLUMN "importedRows" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "uploads" ADD COLUMN "invalidRows" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "uploads" ADD COLUMN "errorMessage" text;--> statement-breakpoint
ALTER TABLE "uploads" ADD COLUMN "startedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "uploads" ADD COLUMN "finishedAt" timestamp;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_salon_id_salons_id_fk" FOREIGN KEY ("salon_id") REFERENCES "public"."salons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_recipes" ADD CONSTRAINT "service_recipes_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_recipes" ADD CONSTRAINT "service_recipes_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "uploads" ADD CONSTRAINT "uploads_salonId_salons_id_fk" FOREIGN KEY ("salonId") REFERENCES "public"."salons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "uploads" DROP COLUMN "salon_id";--> statement-breakpoint
ALTER TABLE "uploads" DROP COLUMN "file_type";--> statement-breakpoint
ALTER TABLE "uploads" DROP COLUMN "uploaded_at";