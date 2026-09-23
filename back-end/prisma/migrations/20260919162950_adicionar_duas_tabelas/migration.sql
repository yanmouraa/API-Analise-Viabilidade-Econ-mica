-- CreateTable
CREATE TABLE "PSPN" (
    "id" SERIAL NOT NULL,
    "ano" INTEGER NOT NULL,
    "nivel" TEXT NOT NULL,
    "classe" INTEGER NOT NULL,
    "salario" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "PSPN_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalarioMunicipio" (
    "id" SERIAL NOT NULL,
    "municipio" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "nivel" TEXT NOT NULL,
    "classe" INTEGER NOT NULL,
    "salario" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "SalarioMunicipio_pkey" PRIMARY KEY ("id")
);
