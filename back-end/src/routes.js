import { Router } from "express";
import prisma from "./prisma.js";
const router = Router();

router.get("/all-municipios", async (req, res) => {
    const municipios = await prisma.municipio.findMany({
        select: {
            nome: true
        },
        orderBy: {
            nome: "asc"
        }
    });

    res.json(municipios.map((municipio) => municipio.nome));
});

router.get("/municipios/:nome", async (req, res) => {
    const nome = String(req.params.nome || "").trim();

    if (!nome || nome.length > 100) {
        return res.status(400).json({
            message: "Nome do município inválido"
        });
    }

    const municipio = await prisma.municipio.findFirst({
        where: {
            nome: {
                equals: nome,
                mode: "insensitive"
            }
        },
        include: {
            dados: {
                orderBy: {
                    ano: "asc"
                }
            }
        }
    });

    if (!municipio) {
        return res.status(404).json({
            message: "Município não encontrado"
        });
    }

    const dados = municipio.dados.map((dado) => {
        const rcl = Number(dado.rcl);
        const dtp = Number(dado.dtp);
        const fundeb = Number(dado.fundeb ?? 0);

        return {
            ano: dado.ano,
            rcl,
            dtp,
            fundeb,
            dtpPercentual: rcl > 0 ? (dtp / rcl) * 100 : 0
        };
    });

    return res.json({
        municipio: municipio.nome,
        dados
    });
});

router.post("/municipios", async (req, res) => {
    const nome = typeof req.body?.nome === "string" ? req.body.nome.trim() : "";

    if (!nome || nome.length > 100) {
        return res.status(400).json({
            message: "Informe um município válido"
        });
    }

    const municipio = await prisma.municipio.findFirst({
        where: {
            nome: {
                equals: nome,
                mode: "insensitive"
            }
        },
        include: {
            dados: {
                orderBy: {
                    ano: "asc"
                }
            }
        }
    });

    if (!municipio) {
        return res.status(404).json({
            message: "Município não encontrado"
        });
    }

    const dados = municipio.dados.map((dado) => {
        const rcl = Number(dado.rcl);
        const dtp = Number(dado.dtp);
        const fundeb = Number(dado.fundeb ?? 0);

        return {
            ano: dado.ano,
            rcl,
            dtp,
            fundeb,
            dtpPercentual: rcl > 0 ? (dtp / rcl) * 100 : 0
        };
    });

    return res.json({
        municipio: municipio.nome,
        dados
    });
});


export default router;