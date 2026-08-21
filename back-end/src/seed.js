import prisma from "./prisma.js";

const municipios = [
        {
            nome: "Curitiba",
            dados: [
            { ano: 2021, rcl: 9550000000.00, dtp: 4150000000.00, fundeb: 930000000.00 },
            { ano: 2022, rcl: 10050000000.00, dtp: 4340000000.00, fundeb: 980000000.00 },
            { ano: 2023, rcl: 10550000000.00, dtp: 4520000000.00, fundeb: 1030000000.00 },
            { ano: 2024, rcl: 10980000000.00, dtp: 4700000000.00, fundeb: 1080000000.00 },
            { ano: 2025, rcl: 11234850000.00, dtp: 4887159000.00, fundeb: 1104532900.45 }
            ]
        },

        {
            nome: "Londrina",
            dados: [
            { ano: 2021, rcl: 2850000000.00, dtp: 1250000000.00, fundeb: 235000000.00 },
            { ano: 2022, rcl: 2980000000.00, dtp: 1310000000.00, fundeb: 248000000.00 },
            { ano: 2023, rcl: 3120000000.00, dtp: 1380000000.00, fundeb: 265000000.00 },
            { ano: 2024, rcl: 3250000000.00, dtp: 1440000000.00, fundeb: 280000000.00 },
            { ano: 2025, rcl: 3377926564.31, dtp: 1491260276.59, fundeb: 294120450.10 }
            ]
        },

        {
            nome: "Xaxim",
            dados: [
            { ano: 2021, rcl: 19800000.00, dtp: 10300000.00, fundeb: 7400000.00 },
            { ano: 2022, rcl: 21000000.00, dtp: 10900000.00, fundeb: 7900000.00 },
            { ano: 2023, rcl: 22300000.00, dtp: 11600000.00, fundeb: 8300000.00 },
            { ano: 2024, rcl: 23200000.00, dtp: 12100000.00, fundeb: 8600000.00 },
            { ano: 2025, rcl: 24150000.00, dtp: 12558000.00, fundeb: 8920350.15 }
            ]
        },

        {
            nome: "Cascavel",
            dados: [
            { ano: 2021, rcl: 1540000000.00, dtp: 748000000.00, fundeb: 165000000.00 },
            { ano: 2022, rcl: 1630000000.00, dtp: 790000000.00, fundeb: 175000000.00 },
            { ano: 2023, rcl: 1715000000.00, dtp: 830000000.00, fundeb: 184000000.00 },
            { ano: 2024, rcl: 1780000000.00, dtp: 865000000.00, fundeb: 191000000.00 },
            { ano: 2025, rcl: 1845300000.00, dtp: 894970000.00, fundeb: 198450800.00 }
            ]
        },

        {
            nome: "Paranaguá",
            dados: [
            { ano: 2021, rcl: 1080000000.00, dtp: 538000000.00, fundeb: 93000000.00 },
            { ano: 2022, rcl: 1140000000.00, dtp: 567000000.00, fundeb: 99000000.00 },
            { ano: 2023, rcl: 1195000000.00, dtp: 595000000.00, fundeb: 104000000.00 },
            { ano: 2024, rcl: 1230000000.00, dtp: 615000000.00, fundeb: 108000000.00 },
            { ano: 2025, rcl: 1273807000.00, dtp: 634355886.00, fundeb: 110933529.03 }
            ]
        }
];

async function main() {
    for (const municipio of municipios) {
        const registroMunicipio = await prisma.municipio.upsert({
            where: { nome: municipio.nome },
            update: {},
            create: { nome: municipio.nome }
        });

        for (const dado of municipio.dados) {
            await prisma.dadosFinanceiros.upsert({
                where: {
                    municipioId_ano: {
                        municipioId: registroMunicipio.id,
                        ano: dado.ano
                    }
                },
                update: {
                    rcl: dado.rcl,
                    dtp: dado.dtp,
                    fundeb: dado.fundeb
                },
                create: {
                    ...dado,
                    municipioId: registroMunicipio.id
                }
            });
        }
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });