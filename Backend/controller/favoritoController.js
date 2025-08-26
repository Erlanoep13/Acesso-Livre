// Backend/controller/favoritoController.js
import Favorito from "../model/favorito.js";

const favoritoController = {
  adicionar: async (req, res) => {
    try {
      const { chave_user, id_local } = req.body;
      const novoFavorito = await Favorito.adicionar(chave_user, id_local);
      res.status(201).json({ mensagem: "Local favoritado com sucesso!", favorito: novoFavorito });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao favoritar local", detalhe: err.message });
    }
  },

  listarPorUsuario: async (req, res) => {
    try {
      const { chave_user } = req.params;
      const favoritos = await Favorito.listarPorUsuario(chave_user);
      res.json(favoritos);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao buscar favoritos", detalhe: err.message });
    }
  }
};

export default favoritoController;

