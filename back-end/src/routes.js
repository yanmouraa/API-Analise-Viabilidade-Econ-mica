import { Router } from "express";
import prisma from "./prisma.js";
const router = Router();

router.get("/all-municipios", async (req, res) => {
    const result = await prisma.municipio.findMany({
        include: {
            dados: true
        }
    });
    res.json(result);
});

router.get("/anos", async (req, res) => {
    const anos = await prisma.dadosFinanceiros.findMany({
        select: {
            ano: true
        },
        distinct: ["ano"],
        orderBy: {
            ano: "asc"
        }
    });
    
    res.json(anos);
})

router.get("/municipios/:nome", async (req, res) => {
    const result = await prisma.municipio.findFirst({
        where: {
            nome: {
                equals: req.params.nome,
                mode: "insensitive"
            }
        },
        include: {
            dados: true
        }
    });
    res.json(result);
});

router.post("/municipios", async (req, res) => {
    const nome = req.body.nome?.trim();
    const ano = Number(req.body.ano);

    if (!Number.isInteger(ano)) {
        return res.status(400).json({
            message: "Informe um ano válido"
        });
    }

    if (!nome) {
        return res.status(400).json({
            message: "Informe o nome do município"
        });
    }

    const municipio = await prisma.municipio.findFirst({
        where: {
            nome: {
                equals: nome,
                mode: "insensitive"
            },
            dados: {
                some: {
                    ano
                }
            }
        },
        include: {
            dados: {
                where: {
                    ano
                }
            }
        }
    });

    if (!municipio) {
        return res.status(404).json({
            message: "Município ou ano não encontrado"
        });
    }

    const dado = municipio.dados[0];

    if (!dado) {
        return res.status(404).json({
            message: `Não há dados para ${nome} no ano ${ano}`
        });
    }

    const rcl = Number(dado.rcl);
    const dtp = Number(dado.dtp);
    const fundeb = Number(dado.fundeb ?? 0);
    const dtpPercentual = rcl > 0 ? (dtp / rcl) * 100 : 0;

    return res.json({
        municipio: municipio.nome,
        rcl,
        dtp,
        fundeb,
        dtpPercentual
    });
});


export default router;