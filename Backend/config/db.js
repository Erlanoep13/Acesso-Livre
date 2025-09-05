import postgres from "postgres";

// Lê a string de conexão do .env
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("❌ DATABASE_URL não definida no .env");
}

// Cria cliente do Supabase
const sql = postgres(connectionString, {
  ssl: "require",              // Supabase exige SSL
  idle_timeout: 20,            // segundos de inatividade antes de fechar
  connect_timeout: 10,         // tempo limite para conectar
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
      // Usamos .unsafe porque você está usando placeholders ($1, $2...)
      const result = await sql.unsafe(text, params);

      // `result` sempre retorna um array de objetos
      return result;
    } catch (err) {
      console.error("❌ Erro na query SQL:", err.message);
      throw err;
    }
  },
};

export default db;