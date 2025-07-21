const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../db/database.db');
const db = new sqlite3.Database(dbPath);

// Criar a tabela, se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS locais (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      categoria TEXT,
      rampa BOOLEAN,
      banheiro BOOLEAN,
      braille BOOLEAN,
      localizacao TEXT,
      foto TEXT,
      descricao_foto TEXT
    )
  `);
});

module.exports = db;
