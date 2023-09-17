/*
  Warnings:

  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropIndex
DROP INDEX "Order_userId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
