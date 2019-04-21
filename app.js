const express = require('express');
const app = express();

app.listen(3000, (error) => {
  if(error) {
    console.log(error);
  }
  console.log('App rodando na porta 3000');
});
  
