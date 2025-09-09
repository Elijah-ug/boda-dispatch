-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" SERIAL NOT NULL,
    "txHash" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "from" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
