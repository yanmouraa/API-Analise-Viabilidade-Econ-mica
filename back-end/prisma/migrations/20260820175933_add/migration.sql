/*
  Warnings:

  - You are about to alter the column `rcl` on the `DadosFinanceiros` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,2)`.
  - You are about to alter the column `dtp` on the `DadosFinanceiros` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,2)`.
  - You are about to alter the column `fundeb` on the `DadosFinanceiros` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,2)`.

*/
-- AlterTable
ALTER TABLE "DadosFinanceiros" ALTER COLUMN "rcl" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "dtp" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "fundeb" DROP NOT NULL,
ALTER COLUMN "fundeb" SET DATA TYPE DECIMAL(20,2);
