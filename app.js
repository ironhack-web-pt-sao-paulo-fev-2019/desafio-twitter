const express = require('express');
const hbs = require('hbs');
require('dotenv').config()
const Twitter = require('twitter');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");

// Configuração do twitter Client. 
// Você pode obter os valores das chaves em: https://developer.twitter.com/en/apps
// As variáveis abaixo devem estar no arquivo '.env', na raiz deste projeto
// como seguinte formato:
// TWITTER_CONSUMER_KEY=(consumer_key da sua aplicação, fornecida pelo twitter)
// TWITTER_CONSUMER_SECRET=(consumer_secret da sua aplicação)
// TWITTER_ACCESS_TOKEN_KEY=(access_token_key da sua aplicação)
// TWITTER_ACCESS_TOKEN_SECRET=(acces_token_secret da sua aplicação)

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Rotas públicas (acesso sem autenticação)
app.get('/', (request, response) => {
  // Esta é a rota principal, é a página que aparece o formulário de busca
  // A linha abaixo quer dizer: responda renderizando o template "index.hbs" que está dentro da pasta views
  response.render('index');
});

app.get('/search-results', (request, response) => {
  const query = request.query.query;
  // código da busca no twitter por *query* (sem asterisco)
  twitterClient.get('search/tweets', { q: query }, (error, tweets) => {
    // Segundo documentação da api do twitter (https://developer.twitter.com/en/docs/tweets/search/quick-start/premium-30-day), 
    // esta (rota) retorna um objeto tweet.statuses com os posts
    const { statuses } = tweets;
    // renderizando nosso resultado de busca
    response.render('search-results', { query, posts: statuses } );
  });
});

app.get('/user/:username', (request, response) => {
  const { username } = request.params;  
  // Mais detalhes do resultado em: https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html
  // O código abaixo retorna a lista de posts da timeline de um usuário
  twitterClient.get('statuses/user_timeline', { screen_name: username }, (error, tweets) => {
    response.render('user-profile', { username, posts: tweets } );
  });
});

// Rotas privadas (acessa apenas para quem está autenticado)


// Inicialização do servidor
app.listen(3000, (error) => {
  if(error) {
    console.log(error);
  }
  console.log('App rodando na porta 3000');
});
  
