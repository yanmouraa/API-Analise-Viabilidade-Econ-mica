-- CreateTable
CREATE TABLE "Municipio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Municipio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Municipio_nome_key" ON "Municipio"("nome");
