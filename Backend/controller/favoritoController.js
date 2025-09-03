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
  },

  remover: async (req, res) => {
    try {
      const { chave_user, id_local } = req.body;

      if (!chave_user || !id_local) {
        return res.status(400).json({ erro: "Dados insuficientes para remover favorito." });
      }

      const removido = await Favorito.remover(chave_user, id_local);

      if (!removido) {
        return res.status(404).json({ erro: "Favorito não encontrado." });
      }

      res.json({ mensagem: "Favorito removido com sucesso!", removido });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao remover favorito", detalhe: err.message });
    }
  }
};

export default favoritoController;
