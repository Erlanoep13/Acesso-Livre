import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("❌ DATABASE_URL não definida no .env ou nas variáveis do Render");
}

// Cria cliente do Supabase
const sql = postgres(connectionString, {
  ssl: { rejectUnauthorized: false }, // Supabase exige SSL
  idle_timeout: 20,                   // segundos de inatividade antes de fechar
  connect_timeout: 10,                // tempo limite para conectar
  max_lifetime: 1800                  // máximo de 30min por conexão
});

// Wrapper para manter compatibilidade com `.query()`
const db = {
  /**
   * Executa uma query SQL
   * @param {string} text - Query SQL com placeholders ($1, $2, etc.)
   * @param {Array} params - Valores para os placeholders
   * @returns {Promise<Array>} - Linhas retornadas pela query
   */
  async query(text, params = []) {
    try {
      // Usamos .unsafe porque você está controlando placeholders
      const result = await sql.unsafe(text, params);
      return result;
    } catch (err) {
      console.error("❌ Erro na query SQL:", err.message);
      throw err;
    }
  },
};

export default db;