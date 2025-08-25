import { Router } from "express";
import { criarUsuario, loginUsuario } from "../controller/usuarioController.js";

const router = Router();

// Rota para criar usuário
router.post("/criar", criarUsuario);

// Rota para login de usuário
router.post("/login", loginUsuario);

export default router;