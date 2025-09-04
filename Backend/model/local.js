import db from "../config/db.js";

const Local = {
  async buscarPorNome(nome) {
    try {
      const result = await db.query(
        "SELECT * FROM locais WHERE nome_local ILIKE $1",
        [`%${nome}%`]
      );
      return result; // já é array
    } catch (err) {
      console.error("Erro ao buscar locais:", err);
      throw err;
    }
  },

  async criarLocal({ nome_local, tipo_acessibilidade, categoria, imagem, descricao, localizacao, latitude, longitude, chave_user }) {
    try {
      const result = await db.query(
        `INSERT INTO locais 
          (nome_local, tipo_acessibilidade, categoria, imagem, descricao, localizacao, latitude, longitude, chave_user)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         RETURNING *`,
        [nome_local, tipo_acessibilidade, categoria, imagem, descricao, localizacao, latitude, longitude, chave_user]
      );
      return result[0]; // pega o primeiro registro
    } catch (err) {
      console.error("Erro ao criar local:", err);
      throw err;
    }
  },

  async buscarTodos() {
    try {
      const result = await db.query("SELECT * FROM locais");
      return result; // já é array
    } catch (err) {
      console.error("Erro ao buscar todos os locais:", err);
      throw err;
    }
  },

  async atualizarLocal(id_local, { nome_local, tipo_acessibilidade, categoria, imagem, descricao, localizacao, latitude, longitude }) {
    try {
      const result = await db.query(
        `UPDATE locais
       SET nome_local = $1,
           tipo_acessibilidade = $2,
           categoria = $3,
           imagem = $4,
           descricao = $5,
           localizacao = $6,
           latitude = $7,
           longitude = $8
       WHERE id_local = $9
       RETURNING *`,
        [nome_local, tipo_acessibilidade, categoria, imagem, descricao, localizacao, latitude, longitude, id_local]
      );
      return result[0]; // pega o primeiro registro atualizado
    } catch (err) {
      console.error("Erro ao atualizar local:", err);
      throw err;
    }
  }
};

export default Local;