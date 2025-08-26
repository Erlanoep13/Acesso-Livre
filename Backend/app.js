// Backend/app.js
import express from "express";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import localRoutes from "./routes/localRoutes.js";
import favoritoRoutes from "./routes/favoritoRoutes.js"

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/usuarios", usuarioRoutes);
app.use("/locais", localRoutes);
app.use("/favoritos", favoritoRoutes);

app.get("/", (req, res) => {
  res.send("Servidor AcessoLivre está funcionando 🚀");
});

export default app;
