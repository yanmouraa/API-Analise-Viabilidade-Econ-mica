-- CreateTable
CREATE TABLE "DadosFinanceiros" (
    "id" SERIAL NOT NULL,
    "ano" INTEGER NOT NULL,
    "rcl" DECIMAL(65,30) NOT NULL,
    "dtp" DECIMAL(65,30) NOT NULL,
    "fundeb" DECIMAL(65,30) NOT NULL,
    "municipioId" INTEGER NOT NULL,

    CONSTRAINT "DadosFinanceiros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DadosFinanceiros_municipioId_ano_key" ON "DadosFinanceiros"("municipioId", "ano");

-- AddForeignKey
ALTER TABLE "DadosFinanceiros" ADD CONSTRAINT "DadosFinanceiros_municipioId_fkey" FOREIGN KEY ("municipioId") REFERENCES "Municipio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
