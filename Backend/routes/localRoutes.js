import express from "express";
import localController from "../controller/localController.js";

const router = express.Router();

// GET /locais/buscar?nome=Praça
router.get("/buscar", localController.buscarLocais);

// GET /locais → lista todos os locais
router.get("/", localController.listarTodos);

// POST /locais/criar
router.post("/criar", localController.criarLocal);

export default router;
