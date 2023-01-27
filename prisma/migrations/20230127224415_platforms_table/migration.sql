/*
  Warnings:

  - Added the required column `platform_id` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" ADD COLUMN     "platform_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "platforms" (
    "id" SERIAL NOT NULL,
    "platform" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "platforms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "platforms_platform_key" ON "platforms"("platform");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platforms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
