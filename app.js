const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

// Configurar a conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'aluno',
  database: 'mydb',
});
db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      throw err;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida.');
  });
  
  // Configurar a sessão
  app.use(
    session({
      secret: 'sua_chave_secreta',
      resave: true,
      saveUninitialized: true,
    })
  );
  
  app.use(bodyParser.urlencoded({ extended: true }));
  
  // Configurar EJS como o motor de visualização
  app.set('view engine', 'ejs');
  
  // ROTAS
  app.get('/', (req, res) => {
    res.render('index');
  });


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
