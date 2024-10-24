// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Para carregar variáveis de ambiente

const app = express();
const PORT = process.env.PORT || 5000; // Usando variável de ambiente para a porta

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, { // Usando variável de ambiente para a URI do MongoDB
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('💾  MongoDB conectado com sucesso em:', process.env.MONGODB_URI);
})
.catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

// Importar rotas
const cadastroRoutes = require('./routes/cadastro');
const empresasRoutes = require('./routes/empresas'); // Importando rotas de empresas
const tabelaPontoRoutes = require('./routes/TabelaPonto'); // Importando rotas de tabela de ponto
const loginRoutes = require('./routes/Login'); // Importa as rotas de login

// Usar rotas
app.use('/api/cadastro', cadastroRoutes);
app.use('/api/empresas', empresasRoutes); // Usando rotas de empresas
app.use('/api/tabelaponto', tabelaPontoRoutes); // Usando rotas de tabela de ponto
app.use('/api/auth', loginRoutes);

// Rota padrão para a API
app.get('/', (req, res) => {
  res.send('API do Ponto Supremo');
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀  Servidor backend rodando na porta ${PORT}`);
  console.log(`🔗  Acesse o backend em: http://localhost:${PORT}`);
});
