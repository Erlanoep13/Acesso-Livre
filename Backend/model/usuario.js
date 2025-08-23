import pool from "../config/db.js";

class Usuario {
  static async criar(nome) {
    const query = `
      INSERT INTO usuario (nome)
      VALUES ($1)
      RETURNING "chave_user" as chave_user, "nome" as nome;
    `;
    const values = [nome];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

export default Usuario;