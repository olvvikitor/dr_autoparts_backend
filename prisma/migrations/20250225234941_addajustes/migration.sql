/*
  Warnings:

  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductBrand` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `marca` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoUnidade" AS ENUM ('PECA', 'KIT', 'JOGO');

-- DropForeignKey
ALTER TABLE "ProductBrand" DROP CONSTRAINT "ProductBrand_brandId_fkey";

-- DropForeignKey
ALTER TABLE "ProductBrand" DROP CONSTRAINT "ProductBrand_productId_fkey";

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "marca" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "tipo" "TipoUnidade" NOT NULL;

-- DropTable
DROP TABLE "Brand";

-- DropTable
DROP TABLE "ProductBrand";

-- CreateTable
CREATE TABLE "ProductFornecedor" (
    "productId" INTEGER NOT NULL,
    "fornecedorId" INTEGER NOT NULL,

    CONSTRAINT "ProductFornecedor_pkey" PRIMARY KEY ("productId","fornecedorId")
);

-- AddForeignKey
ALTER TABLE "ProductFornecedor" ADD CONSTRAINT "ProductFornecedor_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFornecedor" ADD CONSTRAINT "ProductFornecedor_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
