/*
  Warnings:

  - You are about to drop the column `orderedBookId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `OrderedBook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_orderedBookId_fkey";

-- DropIndex
DROP INDEX "Order_orderedBookId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderedBookId";

-- AlterTable
ALTER TABLE "OrderedBook" ADD COLUMN     "orderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderedBook" ADD CONSTRAINT "OrderedBook_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
