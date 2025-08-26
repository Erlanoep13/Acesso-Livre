// Backend/routes/localRoutes.js
import express from "express";
import localController from "../controller/localController.js";

const router = express.Router();

// GET /locais/buscar?nome=Praça
router.get("/buscar", localController.buscarLocais);

export default router;
