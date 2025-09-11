-- CreateTable
CREATE TABLE "public"."Rider" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "earnings" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "riderId" TEXT NOT NULL,
    "completedTrips" TEXT NOT NULL,
    "totalTrips" TEXT NOT NULL,
    "isRegistered" BOOLEAN NOT NULL,

    CONSTRAINT "Rider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Client" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "balance" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "isRegistered" BOOLEAN NOT NULL,
    "hasSomeBalance" BOOLEAN NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Trip" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fare" TEXT NOT NULL,
    "rider" TEXT,
    "client" TEXT NOT NULL,
    "distance" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "isAccepted" BOOLEAN NOT NULL,
    "tripStarted" BOOLEAN NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "isPaidOut" BOOLEAN NOT NULL,
    "pickup" TEXT NOT NULL,
    "destination" TEXT NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "txHash" TEXT NOT NULL,
    "gasUsed" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "from" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rider_user_key" ON "public"."Rider"("user");

-- CreateIndex
CREATE UNIQUE INDEX "Client_user_key" ON "public"."Client"("user");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_tripId_key" ON "public"."Trip"("tripId");
