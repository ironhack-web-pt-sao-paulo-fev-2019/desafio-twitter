const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');

// Rotas públicas (acesso sem autenticação)
app.get('/', (request, response) => {
  // Esta é a rota principal, é a página que aparece o formulário de busca
  // A linha abaixo quer dizer: responda renderizando o template "index.hbs" que está dentro da pasta views
  response.render('index');
});

app.get('/search-results', (request, response) => {
  const query = request.query.query;
  // aqui deve ter o código para buscar no twitter por *query* (sem asterisco)
  // o resultado deve ser guardado na variável abaixo e, sem seguida, passada para ser renderizado como resultado
  const result = {};
  response.render('search-results', { query, result } );
});

app.get('/user/:username', (request, response) => {
  const { username } = request.params;
  response.send(`Esta é a rota com os twits do usuário ${username}.`);
});

// Rotas privadas (acessa apenas para quem está autenticado)


// Inicialização do servidor
app.listen(3000, (error) => {
  if(error) {
    console.log(error);
  }
  console.log('App rodando na porta 3000');
});
  
