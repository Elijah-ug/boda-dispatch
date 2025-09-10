/*
  Warnings:

  - You are about to drop the column `cId` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `rId` on the `Trip` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Trip" DROP CONSTRAINT "Trip_cId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trip" DROP CONSTRAINT "Trip_rId_fkey";

-- DropIndex
DROP INDEX "public"."Trip_cId_key";

-- AlterTable
ALTER TABLE "public"."Trip" DROP COLUMN "cId",
DROP COLUMN "rId";
