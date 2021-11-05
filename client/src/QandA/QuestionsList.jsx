import React from 'react';
import Question from './Question.jsx';
import axios from 'axios';
import SearchBar from './SearchBar.jsx';
import QuestionSubmissionForm from './QuestionSubmissionForm.jsx';

class QuestionsList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      questions: [],
      moreQuestionsClicked: false
    };

  }

  componentDidMount() {
    //console.log('currentProductID: ', this.props.currentProductID);
    axios.get(`/qa/questions/${this.props.currentProductID}`)
      .then((response)=>{
        //console.log('componentDidMount response: ', response.data.results);
        this.setState({questions: response.data.results.sort((a, b) => b.question_helpfulness - a.question_helpfulness)});
        console.log('questions: ', this.state.questions);
      })
      .catch((err)=>{
        console.log('error in QList componentDidMount: ', err);
      })
  }

 handleSearch(e){
   console.log('handleSearch invoked');
 }



 handleQuestionSubmission(question){
   console.log('inside of handleQuestionSubmission heres the q: ', question);
   var data={
     body: question.question_body,
     name: question.asker_name,
    //  email: question.email,//need to get from modal form (all this)
     product_id: this.props.currentProductID
   };
   app.post(`/qa/questions${data.product_id}`, data)
   .then((response)=>{
    console.log('handleQuestionSubmission response: ', response.data.results);
    //this.setState({questions: response.data.results.sort((a, b) => b.question_helpfulness - a.question_helpfulness)});
   // console.log('questions: ', this.state.questions);
  })
  .catch((err)=>{
    console.log('error in handleQuestionSubmission: ', err);
  })
 }



 handleMoreQuesitionsClick(){
   console.log('more questions button clicked');
   this.setState({
     moreQuestionsClicked: true
   });
 }
 handleFewerQuesitionsClick(){
   this.setState({
     moreQuestionsClicked: false
   });
 }

  render(){
    if(this.state.questions.length===0){
      return(
        <div>
          <h5>Questions And Answers</h5>
          {/* <SearchBar handleSearch={this.handleSearch.bind(this)}/> */}
          <QuestionSubmissionForm handleQuestionSubmission={this.handleQuestionSubmission.bind(this)}/>
        </div>
      );
    }
    if(this.state.moreQuestionsClicked){
      return(
        <div>
          <h5>Questions And Answers</h5>
          <SearchBar handleSearch={this.handleSearch.bind(this)}/>
          <div>
            {this.state.questions.map((question, i)=>{
              return(
                <Question key={i} question={question} answersList={question.answers}/>
              );
            })}
          </div>
          <button onClick={this.handleFewerQuesitionsClick.bind(this)}>See Fewer Answered Questions</button>
          <QuestionSubmissionForm handleQuestionSubmission={this.handleQuestionSubmission.bind(this)}/>
        </div>
      );

    } else {
      return(
        <div>
          <h5>Questions And Answers</h5>
          <SearchBar handleSearch={this.handleSearch.bind(this)}/>
          <div>
            {this.state.questions.slice(0,4).map((question, i)=>{
            return(
              <Question key={i} question={question} answersList={question.answers}/>
            );
            })}
          </div>
          <button onClick={this.handleMoreQuesitionsClick.bind(this)}>See More Questions</button>
          <QuestionSubmissionForm handleQuestionSubmission={this.handleQuestionSubmission.bind(this)} />
        </div>
      );
    }
  }
}

export default QuestionsList;