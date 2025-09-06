import pool from "../config/db.js";

class Usuario {
  // Método de criação
  static async criar(nome) {
    const query = `
      INSERT INTO usuario (nome)
      VALUES ($1)
      RETURNING chave_user, nome;
    `;
    const values = [nome];
    const result = await pool.query(query, values);

    // result já é um array
    return result[0];
  }

  // Método de login
  static async login(nome, chave_user) {
    const query = `
      SELECT chave_user, nome
      FROM usuario
      WHERE nome = $1 AND chave_user = $2
    `;
    const values = [nome, chave_user];
    const result = await pool.query(query, values);

    // result já é um array
    return result[0] || null;
  }
}

export default Usuario;