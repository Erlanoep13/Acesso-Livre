// Backend/routes/favoritoRoutes.js
import express from "express";
import favoritoController from "../controller/favoritoController.js";

const router = express.Router();

router.post("/favoritar", favoritoController.adicionar);              // POST /favoritos
router.get("/:chave_user", favoritoController.listarPorUsuario); // GET /favoritos/:chave_user

export default router;


