-- CreateTable
CREATE TABLE "LeaderboardPosition" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "LeaderboardPosition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardPosition_userName_key" ON "LeaderboardPosition"("userName");
