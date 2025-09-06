import pool from "../config/db.js";

const Favorito = {
  adicionar: async (chave_user, id_local) => {
    const query = `
      INSERT INTO favoritos (chave_user, id_local)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [chave_user, id_local];
    const result = await pool.query(query, values);
    return result[0]; // retorna o registro inserido
  },

  listarPorUsuario: async (chave_user) => {
    const query = `
      SELECT l.* 
      FROM favoritos f
      JOIN locais l ON f.id_local = l.id_local
      WHERE f.chave_user = $1
    `;
    const result = await pool.query(query, [chave_user]);
    return result; // já é array
  },

  remover: async (chave_user, id_local) => {
    const query = `
      DELETE FROM favoritos
      WHERE chave_user = $1 AND id_local = $2
      RETURNING *
    `;
    const values = [chave_user, id_local];
    const result = await pool.query(query, values);
    return result[0]; // retorna o registro removido ou undefined
  }
};

export default Favorito;