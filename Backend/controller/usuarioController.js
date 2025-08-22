import Usuario from "../model/usuario.js";

export async function criarUsuario(req, res) {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }

    const novoUsuario = await Usuario.criar(nome);

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
      chave: novoUsuario.chaveuser,
      nome: novoUsuario.nome
    });
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}