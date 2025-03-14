-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ultimo_acesso" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Administrator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Administrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Acessos" (
    "id" SERIAL NOT NULL,
    "usuario" TEXT NOT NULL,
    "tipo_usuario" "Role" NOT NULL,
    "data_acesso" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Acessos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_login_key" ON "Administrator"("login");
