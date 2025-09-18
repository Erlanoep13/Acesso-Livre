import postgres from "postgres";

// 1. Lê a string de conexão do ambiente (.env localmente, ou variáveis da Render)
const connectionString = process.env.DATABASE_URL;

// Garante que a variável de ambiente foi definida
if (!connectionString) {
  throw new Error("❌ DATABASE_URL não definida no .env ou nas variáveis do Render");
}

// 2. Define uma configuração base para a conexão
const config = {
  idle_timeout: 20,      // Segundos de inatividade antes de fechar a conexão
  connect_timeout: 10,   // Tempo limite para tentar conectar
  ssl: null,
};

// 3. Adiciona a configuração de SSL SOMENTE se o ambiente for de produção
// A Render define a variável NODE_ENV = "production" automaticamente.
if (process.env.NODE_ENV === "production") {
  config.ssl = { rejectUnauthorized: false }; // Necessário para o Supabase
}

// 4. Cria a instância do cliente Postgres com a configuração correta
const sql = postgres(connectionString, config);


// 5. Cria um "wrapper" para padronizar o uso das queries no resto do código
const db = {
  /**
   * Executa uma query SQL de forma segura.
   * @param {string} text - A query SQL com placeholders ($1, $2, etc.).
   * @param {Array} params - Os valores para substituir os placeholders.
   * @returns {Promise<Array>} - As linhas retornadas pela query.
   */
  async query(text, params = []) {
    try {
      // A biblioteca 'postgres' usa uma sintaxe um pouco diferente,
      // então usamos .unsafe() para compatibilidade com a sintaxe de placeholders $1, $2.
      // A chamada ainda é segura contra SQL Injection.
      const result = await sql.unsafe(text, params);
      return result;
    } catch (err) {
      console.error("❌ Erro na query SQL:", err.message);
      throw err;
    }
  },
};

export default db;
export { sql };