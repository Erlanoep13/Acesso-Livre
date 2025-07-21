const db = require('../models/db');

// Listar locais
exports.getAll = (req, res) => {
  db.all("SELECT * FROM locais", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Adicionar local
exports.create = (req, res) => {
  const {
    nome, descricao, categoria, rampa, banheiro,
    libras, localizacao, foto, descricao_foto
  } = req.body;

  const sql = `
    INSERT INTO locais (nome, descricao, categoria, rampa, banheiro, libras, localizacao, foto, descricao_foto)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [nome, descricao, categoria, rampa, banheiro, libras, localizacao, foto, descricao_foto];

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
};

// Editar local
exports.update = (req, res) => {
  const { id } = req.params;
  const {
    nome, descricao, categoria, rampa, banheiro,
    libras, localizacao, foto, descricao_foto
  } = req.body;

  const sql = `
    UPDATE locais
    SET nome = ?, descricao = ?, categoria = ?, rampa = ?, banheiro = ?, libras = ?, localizacao = ?, foto = ?, descricao_foto = ?
    WHERE id = ?
  `;
  const params = [nome, descricao, categoria, rampa, banheiro, libras, localizacao, foto, descricao_foto, id];

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Local atualizado" });
  });
};

// Remover local
exports.remove = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM locais WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Local removido" });
  });
};