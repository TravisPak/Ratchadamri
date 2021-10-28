import React from 'react';

const QuestionsList=(props)=>{
  render(
    return(
<ul>
{props.questions.map((question)=>{
  return(
<li>
questions here
</li>
);
})}
</ul>
    );
  );
};

export default QuestionsList;