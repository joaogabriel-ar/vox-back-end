/*
  Warnings:

  - You are about to drop the column `password` on the `servers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `servers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "servers_password_key";

-- AlterTable
ALTER TABLE "servers" DROP COLUMN "password";

-- CreateIndex
CREATE UNIQUE INDEX "servers_code_key" ON "servers"("code");
