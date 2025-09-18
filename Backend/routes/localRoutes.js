import express from "express";
import localController from "../controller/localController.js";

const router = express.Router();

// GET /locais/buscar?nome=Praça
router.get("/buscar", localController.buscarLocais);

// GET /locais
router.get("/", localController.listarLocais);

// POST /locais/criar
router.post("/criar", localController.criarLocal);

// PUT /locais/atualizar
router.put("/atualizar/:id_local", localController.atualizarLocal);

// DELETE /locais/:id_local (ex: /locais/5)
router.delete("/:id_local", localController.deletarLocal);

export default router;
