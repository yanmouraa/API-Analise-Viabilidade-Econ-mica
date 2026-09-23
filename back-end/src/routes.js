import { Router } from "express";
import prisma from "./prisma.js";
const router = Router();

function normalizarNome(nome) {
    return String(nome)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR")
        .trim();
}

async function encontrarMunicipio(nome) {
    const municipios = await prisma.municipio.findMany({
        include: {
            dados: {
                orderBy: {
                    ano: "asc"
                }
            }
        }
    });

    const nomeNormalizado = normalizarNome(nome);
    return municipios.find((municipio) => normalizarNome(municipio.nome) === nomeNormalizado);
}

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

    const municipio = await encontrarMunicipio(nome);

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

    const municipio = await encontrarMunicipio(nome);

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

router.get("/pspn", async (req, res) => {
    const pspn = await prisma.PSPN.findMany();
    return res.json(pspn);
});

export default router;