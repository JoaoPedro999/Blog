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

  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.get('/cadastro', (req, res) => {
    res.render('cadastro');
  });

  app.get('/posts', (req, res) => {
    res.render('posts');
  });


  //*

  app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const query = 'SELECT * FROM user WHERE name = ? AND password = ?';
  
    db.query(query, [name, password], (err, results) => {
      if (err) {
        console.error('Erro na consulta SQL:', err);
        return res.status(500).send('Erro interno. <a href="/login">Tente novamente</a>');
      }
  
      if (results.length > 0) {
        // Usuário autenticado com sucesso
        req.session.loggedin = true;
        req.session.username = name;
        res.redirect('/posts'); // Redireciona para a página de dashboard ou outra página desejada
      } else {
        return res.status(400).send('Credenciais incorretas. <a href="/login">Tente novamente</a>');
      }
    });
  });
  
  app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  });

  app.post('/cadastro', (req, res) => {
  const { name, password } = req.body;
  const query = 'INSERT INTO user (name, password) VALUES (?, ? )';

  db.query(query, [name, password], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar o usuário:', err);
      res.status(500).send('Erro ao cadastrar o usuário. <a href="/cadastro">Tente novamente</a>');
    } else {
      console.log('Usuário cadastrado com sucesso!');
      res.status(500).send('Usuário cadastrado com sucesso! <a href="/">voltar</a>');
    }
  });
});
  
// Adicione essas linhas ao seu arquivo app.js

// ...

app.get('/posts', (req, res) => {

  const posts = [
    { title: 'Post 1', content: 'Conteúdo do Post 1' },
    { title: 'Post 2', content: 'Conteúdo do Post 2' },

  ];

  res.render('posts', { posts });
});

app.get('/formulario-publicacao', (req, res) => {
  res.render('form-publicacao');
});

app.post('/criar-post', (req, res) => {

  res.redirect('/posts');
});

// ...

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
