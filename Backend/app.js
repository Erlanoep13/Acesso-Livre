import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
app.use(express.json());

// Rotas
app.use("/usuarios", usuarioRoutes);

app.get("/", (req, res) => {
  res.send("Servidor AcessoLivre está funcionando 🚀");
});

export default app;