import Usuario from "../model/usuario.js";

// Criação de usuário
export async function criarUsuario(req, res) {
  try {
    console.log("📩 Body recebido:", req.body); // debug

    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }

    const novoUsuario = await Usuario.criar(nome);

    // Se o model retornar undefined ou null
    if (!novoUsuario) {
      return res.status(500).json({ error: "Não foi possível criar o usuário" });
    }

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
      chave_user: novoUsuario.chave_user,
      nome: novoUsuario.nome
    });

  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// Login do usuário
export async function loginUsuario(req, res) {
  try {
    console.log("📩 Body recebido (login):", req.body); // debug

    const { nome, chave_user } = req.body;

    if (!nome || !chave_user) {
      return res.status(400).json({ error: "Nome e chave de acesso são obrigatórios" });
    }

    const usuario = await Usuario.login(nome, chave_user);

    if (!usuario) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    return res.status(200).json({
      message: `Seja bem-vindo, ${usuario.nome}!`,
      chave_user: usuario.chave_user,
      nome: usuario.nome
    });

  } catch (err) {
    console.error("Erro ao autenticar usuário:", err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}