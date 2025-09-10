/*
  Warnings:

  - Made the column `user` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user` on table `Rider` required. This step will fail if there are existing NULL values in that column.
  - Made the column `client` on table `Trip` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pickup` on table `Trip` required. This step will fail if there are existing NULL values in that column.
  - Made the column `destination` on table `Trip` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Client" ALTER COLUMN "user" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Rider" ALTER COLUMN "user" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Trip" ALTER COLUMN "rider" DROP NOT NULL,
ALTER COLUMN "client" SET NOT NULL,
ALTER COLUMN "pickup" SET NOT NULL,
ALTER COLUMN "destination" SET NOT NULL;
