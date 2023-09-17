-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('Pending', 'Shipping', 'Delivered');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "statue" "ORDER_STATUS" NOT NULL DEFAULT 'Pending';
