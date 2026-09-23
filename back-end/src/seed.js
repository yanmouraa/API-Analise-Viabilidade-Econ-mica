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
    const pspnA2025 = [
    2973.91,
    3063.13,
    3155.02,
    3249.67,
    3347.16
    ];

    const pspnB2025 = [
        3420.00,
        3522.60,
        3628.27,
        3737.12,
        3849.23
    ];

    const pspnC2025 = [
        3642.30,
        3751.56,
        3864.11,
        3980.03,
        4099.44
    ];

    const pspnD2025 = [
        4006.52,
        4126.72,
        4250.52,
        4378.04,
        4509.38
    ];

    function completarClasses(valores, total = 23) {
        const resultado = [...valores];

        while (resultado.length < total) {
            const ultimo = resultado[resultado.length - 1];

            resultado.push(
                Number((ultimo * 1.03).toFixed(2))
            );
        }

        return resultado;
    }

    const pspnACompleto = completarClasses(pspnA2025);
    const pspnBCompleto = completarClasses(pspnB2025);
    const pspnCCompleto = completarClasses(pspnC2025);
    const pspnDCompleto = completarClasses(pspnD2025);

    await prisma.PSPN.createMany({
        data: pspnACompleto.map((salario, index) => ({
            ano: 2025,
            nivel: "A",
            classe: index + 1,
            salario
        }))
    });

    await prisma.PSPN.createMany({
        data: pspnBCompleto.map((salario, index) => ({
            ano: 2025,
            nivel: "B",
            classe: index + 1,
            salario
        }))
    });

    await prisma.PSPN.createMany({
        data: pspnCCompleto.map((salario, index) => ({
            ano: 2025,
            nivel: "C",
            classe: index + 1,
            salario
        }))
    });

    await prisma.PSPN.createMany({
        data: pspnDCompleto.map((salario, index) => ({
            ano: 2025,
            nivel: "D",
            classe: index + 1,
            salario
        }))
    });

    console.log(pspnACompleto);
    console.log(pspnACompleto.length);
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });