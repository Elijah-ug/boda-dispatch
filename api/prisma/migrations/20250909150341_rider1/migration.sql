-- CreateTable
CREATE TABLE "public"."Rider" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "earnings" INTEGER NOT NULL,
    "user" TEXT,
    "riderId" INTEGER NOT NULL,
    "completedTrips" INTEGER NOT NULL,
    "totalTrips" INTEGER NOT NULL,
    "isRegistered" BOOLEAN NOT NULL,

    CONSTRAINT "Rider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Client" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "balance" INTEGER NOT NULL,
    "user" TEXT,
    "clientId" INTEGER NOT NULL,
    "isRegistered" BOOLEAN NOT NULL,
    "hasSomeBalance" BOOLEAN NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."trip" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fare" INTEGER NOT NULL,
    "charges" INTEGER NOT NULL,
    "distance" TEXT NOT NULL,
    "tripId" INTEGER NOT NULL,
    "tripStarted" BOOLEAN NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "IsPainOut" BOOLEAN NOT NULL,
    "pickup" TEXT,
    "destination" TEXT,
    "cId" INTEGER NOT NULL,
    "rId" INTEGER NOT NULL,

    CONSTRAINT "trip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rider_user_key" ON "public"."Rider"("user");

-- CreateIndex
CREATE UNIQUE INDEX "Client_user_key" ON "public"."Client"("user");

-- CreateIndex
CREATE UNIQUE INDEX "trip_cId_key" ON "public"."trip"("cId");

-- CreateIndex
CREATE UNIQUE INDEX "trip_rId_key" ON "public"."trip"("rId");

-- AddForeignKey
ALTER TABLE "public"."trip" ADD CONSTRAINT "trip_rId_fkey" FOREIGN KEY ("rId") REFERENCES "public"."Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trip" ADD CONSTRAINT "trip_cId_fkey" FOREIGN KEY ("cId") REFERENCES "public"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
