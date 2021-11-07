app.get('/qa/questions/:question_id/answers',(req,res)=>{
  console.log('params: ', req.params);
  let question = req.params;
  let options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${question.question_id}/answers`,
    headers: {
      'User-Agent': 'request',
      Authorization: `${config.TOKEN}`,
    },
    // params: {
    //   question_id: question_id
    // }
  };
  axios(options)
    .then((response)=>{
      res.json(response.data);
    })
    .catch((err)=>{
      res.send(500).send(err);
    })
});