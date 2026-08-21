import express from "express";
import cors from "cors";
import prisma from "./prisma.js";
import routes from "./routes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, async () => {
    try {
        await prisma.$connect();
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados", error);
    }
    console.log(`Servidor rodando na porta ${port}`);
});

