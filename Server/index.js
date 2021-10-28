const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const app = express();
const path = require('path');
const config = require('../config.js');

//middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());



//This route gets all products
app.get('/products', (req, res)=>{

  let options = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/',
    headers: {
      'User-Agent': 'request',
      'Authorization': `${config.TOKEN}`
    }
  };


  axios(options)
    .then((response)=>{
      res.json(response.data);
    })
    .catch((err)=>{
      res.status(500).send(err);
    });
});

//This route gets a single Product
app.get('/products/:product_id', (req, res)=>{
  let product = req.params;

  let options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product.product_id}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${config.TOKEN}`
    }
  };



  axios(options)
    .then((response)=>{
      res.json(response.data);

    })
    .catch((err)=>{
      res.status(500).send(err);
    });
});

//This route gives you the styles for a single product
app.get('/products/:product_id/styles', (req, res)=>{
  let product = req.params;

  let options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product.product_id}/styles`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${config.TOKEN}`
    }
  };



  axios(options)
    .then((response)=>{
      res.json(response.data);

    })
    .catch((err)=>{
      res.status(500).send(err);
    });
});


//This route gives you the related items for a single product
app.get('/products/:product_id/related', (req, res)=>{
  let product = req.params;

  let options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product.product_id}/related`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${config.TOKEN}`
    }
  };



  axios(options)
    .then((response)=>{
      res.json(response.data);

    })
    .catch((err)=>{
      res.status(500).send(err);
    });
});
//This route gives you reviews based on the param object you provide
app.get('/reviews/:product_id/:count/:page/:sort', (req, res)=>{
  let query = req.params;
  console.log('query:', query);
  // console.log('count',query.count);
  // console.log('id',query.product_id);

  let options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/?product_id=${query.product_id}&count=${query.count}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${config.TOKEN}`
    }
  };


  console.log('URL:', options.url);
  axios(options)
    .then((response)=>{
      res.json(response.data);

    })
    .catch((err)=>{
      res.status(500).send(err);
    });
});








app.listen('3000', () => { console.log('app is listening on port 3000'); });

