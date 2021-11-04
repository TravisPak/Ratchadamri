const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const app = express();
const path = require("path");
const config = require("../config.js");

//middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

//This route gets all products
app.get("/products", (req, res) => {
  let query = req.query;
  let options = {
    method: "get",
    url: "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/",
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },
    params:query
  };

  axios(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//This route gets a single Product
app.get("/products/:product_id", (req, res) => {
  let product = req.params;

  let options = {
    method: "get",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product.product_id}`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },
  };

  axios(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//This route gives you the styles for a single product
app.get("/products/:product_id/styles", (req, res) => {
  let product = req.params;

  let options = {
    method: "get",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product.product_id}/styles`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },
  };

  axios(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//This route gives you the related items for a single product
app.get("/products/:product_id/related", (req, res) => {
  let product = req.params;

  let options = {
    method: "get",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product.product_id}/related`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },
  };

  axios(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//This route gives you reviews based on the param object you provide
app.get("/reviews/", (req, res) => {
  let query = req.query;
  console.log("Query", query);

  let options = {
    method: "get",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },
    params: query,
  };

  axios(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
//This route gives you review metadata for a given product
app.get("/reviews/meta/", (req, res) => {
  let query = req.query;
  console.log("Query", query);

  let options = {
    method: "get",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },
    params: query,
  };

  axios(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//This route will post a review for a product by product_id
app.post("/reviews", (req, res) => {
  let body = req.body;
  console.log("Body",body);

  let options = {
    method: "post",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },
    data: body,
  };

  axios(options)
    .then((response) => {
      console.log('respnse.data', response.data);
      res.status(201).json(response.data);
    })
    .catch((err) => {
      console.log('Error message:',err);
      res.status(500).send(err);
    });
});

//route that will update the helpful section for a specific review
app.put('/reviews/:review_id/helpful',(req,res)=>{
  let review = req.params;
  console.log("Params",review);

  let options = {
    method: "put",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/${review.review_id}/helpful`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },

  };

  axios(options)
    .then((response) => {
      console.log('respnse.data', response.data);
      res.status(204).json(response.data);
    })
    .catch((err) => {
      console.log('Error message:',err);
      res.status(500).send(err);
    });

});

//route that updates the report for a specific review
app.put('/reviews/:review_id/report',(req,res)=>{
  let review = req.params;
  console.log("Params",review);

  let options = {
    method: "put",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/${review.review_id}/report`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },

  };

  axios(options)
    .then((response) => {
      console.log('respnse.data', response.data);
      res.status(204).json(response.data);
    })
    .catch((err) => {
      console.log('Error message:',err);
      res.status(500).send(err);
    });

});


app.get("/qa/questions", (req, res) => {
  let query = req.query;
  console.log("Query", query);

  let options = {
    method: "get",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },
    params: query,
  };

  axios(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//get /qa/questions/:question_id/answers
app.get('/qa/questions/:question_id/answers',(req,res)=>{
  console.log('params', req.params);
  let question = req.params;
  let query = req.query;
  let options = {
    method: "get",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${question.question_id}/answers`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },
    params:query

  };

  axios(options)
    .then((response)=>{
      res.json(response.data);
    })
    .catch((err)=>{
      res.send(500).send(err);
    })


});

app.post("/qa/questions", (req, res) => {
  let body = req.body;
  console.log("Body",body);

  let options = {
    method: "post",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },
    data: body,
  };

  axios(options)
    .then((response) => {
      console.log('respnse.data', response.data);
      res.status(201).json(response.data);
    })
    .catch((err) => {
      console.log('Error message:',err);
      res.status(500).send(err);
    });
});


app.post('/qa/questions/:question_id/answers',(req,res)=>{
  console.log('params', req.params);
  let question = req.params;
  let body = req.body;
  let options = {
    method: "get",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${question.question_id}/answers`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },
    data:body

  };

  axios(options)
    .then((response)=>{
      res.status(201).json(response.data);
    })
    .catch((err)=>{
      res.send(500).send(err);
    })


});

//route that will update the helpful section for a specific question
app.put('/qa/questions/:question_id/helpful',(req,res)=>{
  let question = req.params;
  console.log("Params",question);

  let options = {
    method: "put",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${question.question_id}/helpful`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },

  };

  axios(options)
    .then((response) => {
      console.log('respnse.data', response.data);
      res.status(204).json(response.data);
    })
    .catch((err) => {
      console.log('Error message:',err);
      res.status(500).send(err);
    });

});

//route that updates the report for a specific question
app.put('/qa/questions/:question_id/report',(req,res)=>{
  let question = req.params;
  console.log("Params",question);

  let options = {
    method: "put",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${question.question_id}/report`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },

  };

  axios(options)
    .then((response) => {
      console.log('respnse.data', response.data);
      res.status(204).json(response.data);
    })
    .catch((err) => {
      console.log('Error message:',err);
      res.status(500).send(err);
    });

});

app.get('/cart',(req,res)=>{

  let options = {
    method: "get",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/cart`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },

  };

  axios(options)
    .then((response) => {
      console.log('respnse.data', response.data);
      res.json(response.data);
    })
    .catch((err) => {
      console.log('Error message:',err);
      res.status(500).send(err);
    });

});


app.post('/cart',(req,res)=>{
  let body = req.body;
  let options = {
    method: "post",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/cart`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },
    data:body

  };

  axios(options)
    .then((response) => {
      console.log('respnse.data', response.data);
      res.status(201).json(response.data);
    })
    .catch((err) => {
      console.log('Error message:',err);
      res.status(500).send(err);
    });

});


app.post('/interactions',(req,res)=>{
  let body = req.body;
  let options = {
    method: "post",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/interactions`,
    headers: {
      "User-Agent": "request",
      Authorization: `${config.TOKEN}`,
    },
    data:body

  };

  axios(options)
    .then((response) => {
      console.log('respnse.data', response.data);
      res.status(201).json(response.data);
    })
    .catch((err) => {
      console.log('Error message:',err);
      res.status(500).send(err);
    });

});









app.listen("3000", () => {
  console.log("app is listening on port 3000");
});
