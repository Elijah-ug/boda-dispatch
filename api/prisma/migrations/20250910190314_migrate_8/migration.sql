-- DropForeignKey
ALTER TABLE "public"."Trip" DROP CONSTRAINT "Trip_rId_fkey";

-- DropIndex
DROP INDEX "public"."Trip_rId_key";

-- AlterTable
ALTER TABLE "public"."Trip" ALTER COLUMN "rId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "Trip_rId_fkey" FOREIGN KEY ("rId") REFERENCES "public"."Rider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
