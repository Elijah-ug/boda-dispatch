/*
  Warnings:

  - A unique constraint covering the columns `[tripId]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Trip_tripId_key" ON "public"."Trip"("tripId");
