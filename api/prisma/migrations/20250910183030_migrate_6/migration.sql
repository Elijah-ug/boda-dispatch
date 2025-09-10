/*
  Warnings:

  - You are about to drop the column `IsPainOut` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `isPainOut` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Trip" DROP COLUMN "IsPainOut",
ADD COLUMN     "isPainOut" BOOLEAN NOT NULL;
