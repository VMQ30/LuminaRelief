/*
  Warnings:

  - You are about to drop the column `address` on the `locations` table. All the data in the column will be lost.
  - Added the required column `barangay` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "locations_address_key";

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "address",
ADD COLUMN     "barangay" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;
