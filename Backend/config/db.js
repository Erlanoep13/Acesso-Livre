//db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("✅ Conectado ao banco de dados!");
});

pool.on("error", (err) => {
  console.error("❌ Erro no banco de dados:", err);
  process.exit(-1);
});

export default pool;