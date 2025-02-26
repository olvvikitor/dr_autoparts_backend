/*
  Warnings:

  - Added the required column `ano` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "ano" TEXT NOT NULL;
