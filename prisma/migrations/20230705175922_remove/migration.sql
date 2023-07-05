/*
  Warnings:

  - You are about to drop the column `leaderboard_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `leaderboards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_leaderboard_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "leaderboard_id";

-- DropTable
DROP TABLE "leaderboards";
