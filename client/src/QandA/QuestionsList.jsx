import React from 'react';

//conditional render.
  //if LOAD MORE ANSWERES not selected,
    //display first 2 Q's
  //if selected,
    //display whole list, with scroll bar



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