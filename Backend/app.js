import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/usuarios", usuarioRoutes);

app.get("/", (req, res) => {
  res.send("Servidor AcessoLivre está funcionando 🚀");
});

export default app;