const express = require('express');
const cors = require('cors');
const app = express();
const locaisRoutes = require('./routes/locais');

app.use(cors());
app.use(express.json());
app.use('/api/locais', locaisRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});