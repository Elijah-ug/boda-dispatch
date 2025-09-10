/*
  Warnings:

  - You are about to drop the `trip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."trip" DROP CONSTRAINT "trip_cId_fkey";

-- DropForeignKey
ALTER TABLE "public"."trip" DROP CONSTRAINT "trip_rId_fkey";

-- DropTable
DROP TABLE "public"."trip";

-- CreateTable
CREATE TABLE "public"."Trip" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fare" TEXT NOT NULL,
    "charges" TEXT NOT NULL,
    "rider" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "distance" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "tripStarted" BOOLEAN NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "IsPainOut" BOOLEAN NOT NULL,
    "pickup" TEXT,
    "destination" TEXT,
    "cId" INTEGER NOT NULL,
    "rId" INTEGER NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trip_cId_key" ON "public"."Trip"("cId");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_rId_key" ON "public"."Trip"("rId");

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "Trip_rId_fkey" FOREIGN KEY ("rId") REFERENCES "public"."Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "Trip_cId_fkey" FOREIGN KEY ("cId") REFERENCES "public"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
