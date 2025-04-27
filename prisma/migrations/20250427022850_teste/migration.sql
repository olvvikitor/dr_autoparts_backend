-- CreateTable
CREATE TABLE "Carrousel" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "imgUrl" TEXT[],

    CONSTRAINT "Carrousel_pkey" PRIMARY KEY ("id")
);
