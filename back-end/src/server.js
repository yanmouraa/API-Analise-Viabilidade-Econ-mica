import prisma from "./prisma.js";
import app from "./app.js";

const PORT = Number.parseInt(process.env.PORT || "3000", 10);

async function startServer() {
    try {
        await prisma.$connect();
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados", error);
        process.exit(1);
    }
}

process.on("SIGTERM", async () => {
    await prisma.$disconnect();
    process.exit(0);
});

startServer();

