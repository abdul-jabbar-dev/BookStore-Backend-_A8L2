/*
  Warnings:

  - You are about to drop the column `orderId` on the `OrderedBook` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderedBookId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderedBookId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderedBook" DROP CONSTRAINT "OrderedBook_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderedBookId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderedBook" DROP COLUMN "orderId";

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderedBookId_key" ON "Order"("orderedBookId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderedBookId_fkey" FOREIGN KEY ("orderedBookId") REFERENCES "OrderedBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
