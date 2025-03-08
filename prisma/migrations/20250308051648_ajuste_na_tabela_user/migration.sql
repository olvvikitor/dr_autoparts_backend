/*
  Warnings:

  - You are about to drop the column `cpf` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_cpf_key";

-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "cpf" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cpf";

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cpf_key" ON "Empresa"("cpf");
