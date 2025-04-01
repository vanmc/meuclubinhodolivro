const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado ao MongoDB!"))
    .catch(err => console.log("Erro ao conectar ao MongoDB:", err));

// Rotas da API
const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);

// Servir o frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Exportar app para rodar como serverless no Vercel
module.exports = app;

// Aprendendo: 
// express.json(): Middleware do Express para analisar o corpo das requisições em formato JSON;
// mongoose.connect(): Conecta seu backend ao banco de dados MongoDB. A URL de conexão do MongoDB será carregada a partir do arquivo .env;
// dotenv.config(): Carrega as variáveis de ambiente (como a URL do banco de dados) a partir de um arquivo .env;
// CORS: Permite que o seu backend aceite requisições de outras origens, que é importante para quando o frontend e o backend estiverem em locais diferentes.
