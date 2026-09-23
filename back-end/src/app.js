import express from "express";
import cors from "cors";
import routes from "./routes.js";

const app = express();
const localOrigins = [
    "http://localhost:5500",
    "http://localhost:5173",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5173",
    "https://api-analise-viabilidade-econ-mica-silk.vercel.app"
];
const configuredOrigins = (process.env.FRONTEND_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
const allowedOrigins = new Set([...localOrigins, ...configuredOrigins]);

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Origem não permitida pelo CORS"));
    }
}));
app.use(express.json());
app.use(routes);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

export default app;
