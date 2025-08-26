// Backend/controller/localController.js
import Local from "../model/local.js";

const localController = {
  async buscarLocais(req, res) {
    const nome = req.query.nome;

    if (!nome) {
      return res.status(400).json({ message: "Parâmetro 'nome' é obrigatório" });
    }

    try {
      const locais = await Local.buscarPorNome(nome);
      if (locais.length > 0) {
        res.json({ encontrados: true, locais });
      } else {
        res.json({ encontrados: false, locais: [] });
      }
    } catch (err) {
      res.status(500).json({ message: "Erro no servidor" });
    }
  }
};

export default localController;
