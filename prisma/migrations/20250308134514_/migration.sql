/*
  Warnings:

  - You are about to drop the column `cpf` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `razão_social` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Empresa` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `razao_social` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Made the column `cnpj` on table `Empresa` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `tipo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('PESSOA_FISICA', 'EMPRESA');

-- DropForeignKey
ALTER TABLE "Empresa" DROP CONSTRAINT "Empresa_userId_fkey";

-- DropIndex
DROP INDEX "Empresa_cpf_key";

-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "cpf",
DROP COLUMN "razão_social",
DROP COLUMN "userId",
ADD COLUMN     "razao_social" TEXT NOT NULL,
ALTER COLUMN "cnpj" SET NOT NULL,
ALTER COLUMN "cnpj" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cnpj" TEXT,
ADD COLUMN     "contatoId" INTEGER,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "enderecoId" INTEGER,
ADD COLUMN     "tipo" "TipoUsuario" NOT NULL;

-- CreateTable
CREATE TABLE "EmpresaUser" (
    "userId" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "EmpresaUser_pkey" PRIMARY KEY ("userId","empresaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_cnpj_key" ON "User"("cnpj");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_contatoId_fkey" FOREIGN KEY ("contatoId") REFERENCES "Contato"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmpresaUser" ADD CONSTRAINT "EmpresaUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmpresaUser" ADD CONSTRAINT "EmpresaUser_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
