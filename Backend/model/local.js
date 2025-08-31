import pool from "../config/db.js";

const Local = {
  async buscarPorNome(nome) {
    try {
      const result = await pool.query(
        "SELECT * FROM locais WHERE nome_local ILIKE $1",
        [`%${nome}%`]
      );
      return result.rows;
    } catch (err) {
      console.error("Erro ao buscar locais:", err);
      throw err;
    }
  },

  async criarLocal({ nome_local, tipo_acessibilidade, categoria, imagem, descricao, localizacao, latitude, longitude, chave_user }) {
    try {
      const result = await pool.query(
        `INSERT INTO locais 
          (nome_local, tipo_acessibilidade, categoria, imagem, descricao, localizacao, latitude, longitude, chave_user)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         RETURNING *`,
        [nome_local, tipo_acessibilidade, categoria, imagem, descricao, localizacao, latitude, longitude, chave_user]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Erro ao criar local:", err);
      throw err;
    }
  },

  async buscarTodos() {
    try {
      const result = await pool.query("SELECT * FROM locais");
      return result.rows;
    } catch (err) {
      console.error("Erro ao buscar todos os locais:", err);
      throw err;
    }
  }

};

export default Local;
