/*
  Warnings:

  - You are about to drop the `Empresa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmpresaUser` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `cpf` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Empresa" DROP CONSTRAINT "Empresa_contatoId_fkey";

-- DropForeignKey
ALTER TABLE "Empresa" DROP CONSTRAINT "Empresa_enderecoId_fkey";

-- DropForeignKey
ALTER TABLE "EmpresaUser" DROP CONSTRAINT "EmpresaUser_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "EmpresaUser" DROP CONSTRAINT "EmpresaUser_userId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cpf" SET NOT NULL;

-- DropTable
DROP TABLE "Empresa";

-- DropTable
DROP TABLE "EmpresaUser";
