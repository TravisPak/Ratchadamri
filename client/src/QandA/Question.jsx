import React from 'react';
import axios from 'axios';
import moment from 'moment';

class Question extends React.Component {
  constructor(props){
    super(props);
    this.state={
      questionBody: '',
      answersList: [],
      seeMoreAnswersClicked: false
    };
    this.handleAnswerMarkedHelpful=this.handleAnswerMarkedHelpful.bind(this);
    this.handleAnswerReport=this.handleAnswerReport.bind(this);
    this.handleQuestionMarkedHelpful=this.handleQuestionMarkedHelpful.bind(this);
    this.handleQuestionReported=this.handleQuestionReported.bind(this);
    this.handleAddAnswerClick=this.handleAddAnswerClick.bind(this);
  }

  handleSeeMoreAnswersClick(){
    this.setState({
      seeMoreAnswersClicked: true
    });
  }

  handleSeeFewerAnswersClick(){
    this.setState({
      seeMoreAnswersClicked: false
    });
  }

  handleAddAnswerClick(question_id){
    console.log('add answer clicked for question: ', question_id);
    var data={
      body: '',
      name: '',
      email: '',
      photos: []
    };
  //   axios.post(`/qa/questions/${question_id}/answers`, data)
  //   .then((response)=>{
  //    console.log('handleAddAnswerClick response: ', response.data.results);
  //    //this.setState({answersList: response.data.results.sort((a, b) => b.helpfulness - a.helpfulness)});
  //    // console.log('questions: ', this.state.questions);
  //  })
  //  .catch((err)=>{
  //    console.log('error in handleAddAnswerClick: ', err);
  //  })
  }

  handleQuestionReported(question_id){
    console.log('question reported: ', question_id);
    axios.put(`/qa/questions/${question_id}/report`)
    .then((response)=>{
      //this.setState({answersList: response.data.results.sort((a, b) => b.helpfulness - a.helpfulness)});
      console.log('response in handleQuestionReported axios: ', response.data);
      //reRender(); //is this needed here? test with above log; if not, use setState above to update state
    })
    .catch((err)=>{
      console.log('error in handleQuestionReported: ', err);
    })
  }


  handleQuestionMarkedHelpful(question_id){
    //console.log('question marked as helpful: ', question_id);
    axios.put(`/qa/questions/${question_id}/helpful`)
    .then((response)=>{
      //this.setState({answersList: response.data.results.sort((a, b) => b.helpfulness - a.helpfulness)});
      console.log('response in handleQuestionMarkedHelpful: ', response.data);
      //reRender(); //is this needed here? test with above log; if not, use setState above to update state
    })
    .catch((err)=>{
      console.log('error in handleQuestionMarkedHelpful: ', err);
    })
  }

  handleAnswerMarkedHelpful(answer_id){
    console.log('answer marked as helpful: ', answer_id);

    axios.put(`/qa/answers/${answer_id}/helpful`)
    .then((response)=>{
      //this.setState({answersList: response.data.results.sort((a, b) => b.helpfulness - a.helpfulness)});
      console.log('response in handleAnswerMarkedHelpful: ', response.data);
      //reRender(); //is this needed here? test with above log; if not, use setState above to update state
    })
    .catch((err)=>{
      console.log('error in handleAnswerMarkedHelpful: ', err);
    })
  }

  handleAnswerReport(answer_id){
    console.log('answer reported: ', answer_id);

    axios.put(`/qa/answers/${answer_id}/report`)
    .then((response)=>{
      //this.setState({answersList: response.data.results.sort((a, b) => b.helpfulness - a.helpfulness)});
      console.log('response in handleAnswerReport: ', response.data);
      //reRender(); //is this needed here? test with above log; if not, use setState above to update state
    })
    .catch((err)=>{
      console.log('error in handleAnswerReport: ', err);
    })
  }

  componentDidMount() {
    axios.get(`/qa/questions/${this.props.question.question_id}/answers`)
      .then((response)=>{
        this.setState({answersList: response.data.results.sort((a, b) => b.helpfulness - a.helpfulness)});
       // console.log('response from QcompDidMnt: ', response.data.results);
      })
      .catch((err)=>{
        console.log('error in Question componentDidMount: ', err);
      })
  }

  render(){
    if(this.state.seeMoreAnswersClicked){
      return(
        <div >
          <h4>Q: {this.props.question.question_body}</h4>

          <h5>Helpfulness rating: {this.props.question.question_helpfulness}</h5>

          <button onClick={this.handleQuestionMarkedHelpful(this.props.question.question_id)}>Helpful?</button>
          <button onClick={this.handleQuestionReported(this.props.question.question_id)}>Report?</button>

          <h5>{this.state.answersList.map((answer, i)=>{
            return(
              <div key={i}>
              <h5>A: {answer.body}</h5>
              <h5>Helpfulness rating: {answer.helpfulness}</h5>
              <h5>by {answer.answerer_name}, {moment(answer.date, 'YYYYMMDD').fromNow()} </h5>
              <button onClick={this.handleAnswerMarkedHelpful(answer.answer_id)}>Helpful?</button>
              <button onClick={this.handleAnswerReport(answer.answer_id)}>Report?</button>
              </div>
            );
          })}</h5>
          <button onClick={this.handleSeeFewerAnswersClick.bind(this)}>Collapse Answers</button>
          <button onClick={this.handleAddAnswerClick(this.props.question.question_id)}>Add Answer</button>
        </div>
      );
    } else {
      return(
        <div>
          <h4>Q: {this.props.question.question_body}</h4>

          <h5>Helpfulness rating: {this.props.question.question_helpfulness}</h5>

          <button onClick={this.handleQuestionMarkedHelpful(this.props.question.question_id)}>Helpful?</button>
          <button onClick={this.handleQuestionReported(this.props.question.question_id)}>Report?</button>

          <h5>{this.state.answersList.slice(0, 2).map((answer, i)=>{
            return(
              <div key={i}>
              <h5>A: {answer.body}</h5>
              <h5>Helpfulness rating: {answer.helpfulness}</h5>
              <h5>by {answer.answerer_name}, {moment(answer.date, 'YYYYMMDD').fromNow()} </h5>
              <button onClick={this.handleAnswerMarkedHelpful(answer.answer_id)}>Helpful?</button>
              <button onClick={this.handleAnswerReport(answer.answer_id)}>Report?</button>
              </div>
            );
          })}</h5>
          <button onClick={this.handleSeeMoreAnswersClick.bind(this)}>See More Answers</button>
          <button onClick={this.handleAddAnswerClick(this.props.question.question_id)}>Add Answer</button>
        </div>
      );
    }
  }
}

export default Question;