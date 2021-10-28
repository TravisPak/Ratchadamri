const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const app = express();
const path = require('path');
const config = require('../config.js');

//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

//routes
app.get('/products', (req, res)=>{

  let options = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios.get(options)
    .then((data)=>{
      res.json(data);
    })
    .catch((err)=>{
      res.status(500).send(err);
    });
});



// app.any?





app.listen('3000', () => { console.log('app is listening on port 3000'); });

