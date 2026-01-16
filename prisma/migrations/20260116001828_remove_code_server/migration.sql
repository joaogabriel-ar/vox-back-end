/*
  Warnings:

  - You are about to drop the column `code` on the `servers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "servers_code_key";

-- AlterTable
ALTER TABLE "servers" DROP COLUMN "code";
