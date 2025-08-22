import { Router } from "express";
import { criarUsuario } from "../controller/usuarioController.js";

const router = Router();

// Rota para criar usuário
router.post("/criar", criarUsuario);

export default router;