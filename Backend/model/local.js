import db from "../config/db.js";
import { sql } from "../config/db.js";

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
  },

  async deletarLocal(id_local) {
    try {
      // sql.begin() inicia uma transação. A biblioteca gerencia o COMMIT e o ROLLBACK.
      const resultado = await sql.begin(async (sqlTransaction) => {
        // 1. Deleta as associações na tabela 'localrecursos'
        await sqlTransaction`DELETE FROM localrecursos WHERE id_local = ${id_local}`;

        // 2. Deleta as associações na tabela 'favoritos'
        await sqlTransaction`DELETE FROM favoritos WHERE id_local = ${id_local}`;

        // 3. Finalmente, deleta o local da tabela 'locais'
        const localDeletado = await sqlTransaction`DELETE FROM locais WHERE id_local = ${id_local} RETURNING *`;

        return localDeletado;
      });

      // A transação retorna um array. Se o local foi deletado, o array terá um item.
      return resultado.length > 0 ? resultado[0] : null;

    } catch (err) {
      console.error("Erro ao deletar local:", err);
      throw err; // Re-lança o erro para o controller tratar
    }
  }
};

export default Local;