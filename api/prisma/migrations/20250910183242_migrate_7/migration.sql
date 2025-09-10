/*
  Warnings:

  - You are about to drop the column `isPainOut` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `isPaidOut` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Trip" DROP COLUMN "isPainOut",
ADD COLUMN     "isPaidOut" BOOLEAN NOT NULL;
