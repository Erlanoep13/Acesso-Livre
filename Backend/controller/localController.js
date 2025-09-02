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
  },

  async criarLocal(req, res) {
    try {
      const {
        nome_local,
        tipo_acessibilidade,
        categoria,
        imagem,
        descricao,
        localizacao,
        latitude,
        longitude,
        chave_user
      } = req.body;

      if (!nome_local || !tipo_acessibilidade || !categoria || !localizacao || !latitude || !longitude || !chave_user) {
        return res.status(400).json({ message: "Campos obrigatórios não informados" });
      }

      const novoLocal = await Local.criarLocal({
        nome_local,
        tipo_acessibilidade,
        categoria,
        imagem,
        descricao,
        localizacao,
        latitude,
        longitude,
        chave_user
      });

      res.status(201).json({ message: "Local criado com sucesso", local: novoLocal });
    } catch (err) {
      console.error("Erro no controller:", err);
      res.status(500).json({ message: "Erro ao criar local" });
    }
  },

  // Listar todos os locais
  async listarLocais(req, res) {
    try {
      const locais = await Local.buscarTodos();
      res.json(locais);
    } catch (err) {
      console.error("Erro ao listar locais:", err);
      res.status(500).json({ message: "Erro no servidor" });
    }
  },

  async atualizarLocal(req, res) {
    try {
      const { id_local } = req.params;
      const dados = req.body;

      if (!id_local) {
        return res.status(400).json({ message: "ID do local é obrigatório" });
      }

      const localAtualizado = await Local.atualizarLocal(id_local, dados);

      if (!localAtualizado) {
        return res.status(404).json({ message: "Local não encontrado" });
      }

      res.json({ message: "Local atualizado com sucesso", local: localAtualizado });
    } catch (err) {
      console.error("Erro ao atualizar local:", err);
      res.status(500).json({ message: "Erro no servidor" });
    }
  }

};

export default localController;
