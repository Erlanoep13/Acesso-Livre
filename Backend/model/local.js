// Backend/model/local.js
import pool from "../config/db.js";

const Local = {
  async buscarPorNome(nome) {
    try {
      const result = await pool.query(
        "SELECT * FROM locais WHERE NomeLocal ILIKE $1",
        [`%${nome}%`]
      );
      return result.rows;
    } catch (err) {
      console.error("Erro ao buscar locais:", err);
      throw err;
    }
  }
};

export default Local;
