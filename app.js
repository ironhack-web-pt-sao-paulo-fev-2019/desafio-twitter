const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view_engine', 'hbs');
app.set('views', `${__dirname}/views`);

// Rotas públicas (acesso sem autenticação)
app.get('/', (request, response) => {
  response.send('HOME: Esta é a rota principal, ela precisa renderizar um template com um form de busca');
});

app.get('/search-results', (request, response) => {
  response.send('SEARCH RESULTS: Esta é a rota com o resultado da busca de acordo com os criterios escolhidos na capa do site.');
});

app.get('/user-detail/:username', (request, response) => {
  response.send('user-detail: Esta é a rota com os tuwits de um determinado usuário.');
});

// Rotas privadas (acessa apenas para quem está autenticado)


// Inicialização do servidor
app.listen(3000, (error) => {
  if(error) {
    console.log(error);
  }
  console.log('App rodando na porta 3000');
});
  
