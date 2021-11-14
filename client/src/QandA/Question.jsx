import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Modal from './Modal.jsx';
import AnswerSubmissionForm from './AnswerSubmissionForm.jsx';

class Question extends React.Component {
  constructor(props){
    super(props);
    this.state={
      questionBody: '',
      answersList: [],
      seeMoreAnswersClicked: false,
      modalShowing: false,
      helpfulClicked: false
      // answerHelpfulClicked: false
    };
    this.handleAnswerMarkedHelpful=this.handleAnswerMarkedHelpful.bind(this);
    this.handleAnswerReport=this.handleAnswerReport.bind(this);

    this.handleQuestionMarkedHelpful=this.handleQuestionMarkedHelpful.bind(this);
    this.handleQuestionReported=this.handleQuestionReported.bind(this);

    this.showModal=this.showModal.bind(this);
    this.hideModal=this.hideModal.bind(this);
  }

  showModal(){
    this.setState({modalShowing: true});
  }
  hideModal(){
    this.setState({modalShowing: false});
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

  handleAnswerSubmission(answer, nickname, email){
    //console.log('add answer clicked for question: ', answer, nickname, email, this.props.question.question_id);
    var data={
      body: answer,
      name: nickname,
      email: email,
      photos: []
    };
    axios.post(`/qa/questions/${currentQuestionID}/answers`, data)
    .then((response)=>{
     console.log('successful answer submission');
   })
   .catch((err)=>{
     console.log('error in handleAddAnswerClick: ', err);
   })
  }

  handleQuestionReported(question_id){
    console.log('question reported: ', question_id);
    axios.put(`/qa/questions/${question_id}/report`)
    .then((response)=>{
      console.log('successful axios.put req from handleQuestionReported');
    })
    .catch((err)=>{
      console.log('error in handleQuestionReported: ', err);
    })
  }

  handleQuestionMarkedHelpful(question_id){
    console.log('question marked as helpful: ', question_id);
    if(this.state.helpfulClicked===false){
      axios.put(`/qa/questions/${question_id}/helpful`)
      .then((response)=>{
        console.log('successful axios.put req from handleQuestionMarkedHelpful');
      })
      .catch((err)=>{
       console.log('error in handleQuestionMarkedHelpful: ', err);
      })
      this.setState({helpfulClicked: true});
    }
  }

  handleAnswerMarkedHelpful(answer_id){
    console.log('answer marked as helpful: ', answer_id);
    // if(this.state.answerHelpfulClicked===false){
      axios.put(`/qa/answers/${answer_id}/helpful`)
      .then((response)=>{
        console.log('successful axios.put req from handleAnswerMarkedHelpful');
      })
     .catch((err)=>{
        console.log('error in handleAnswerMarkedHelpful: ', err);
      })
      // this.setState({answerHelpfulClicked:true});
    // }
  }

  handleAnswerReport(answer_id){
    console.log('answer reported: ', answer_id);
    axios.put(`/qa/answers/${answer_id}/report`)
    .then((response)=>{
      console.log('successful axios.put req from handleAnswerReport');
    })
    .catch((err)=>{
      console.log('error in handleAnswerReport: ', err);
    })
  }

  componentDidMount() {
    axios.get(`/qa/questions/${this.props.question.question_id}/answers`)
      .then((response)=>{
        this.setState({answersList: response.data.results.sort((a, b) => b.helpfulness - a.helpfulness)});
        //console.log('response from Question compDidMnt: ', response.data.results);
      })
      .catch((err)=>{
        console.log('error in Question componentDidMount: ', err);
      })
  }

  render(){
    if(this.state.answersList.length!==0){
    if(this.state.seeMoreAnswersClicked){
      return(
        <div className='question'>
          <h4 className='question-body'>Q: {this.props.question.question_body}</h4>

          <span className='question-helpful-rating'>Helpful?</span>
          <span className='question-helpful-btn' onClick={()=>this.handleQuestionMarkedHelpful(this.props.question.question_id)}>Yes ({this.props.question.question_helpfulness})</span>
          <span className='question-report-btn' onClick={()=>this.handleQuestionReported(this.props.question.question_id)}>Report?</span>
          <div className='answer-list'>{this.state.answersList.map((answer, i)=>{
            return(
              <div className='answer' key={i}>
              <h5 className='answer-body'>A: {answer.body}</h5>
              {/* <h5 className='answer-helpful-rating'>Helpfulness rating: {answer.helpfulness}</h5> */}
              <h5 className='answer-username'>by {answer.answerer_name}, {moment(answer.date, 'YYYYMMDD').fromNow()} </h5>
              <span className='answer-helpful-btn' onClick={()=>this.handleAnswerMarkedHelpful(answer.answer_id)}>Helpful?</span>
              <span className='answer-report-btn' onClick={()=>this.handleAnswerReport(answer.answer_id)}>Report?</span>
              </div>
            );
          })}</div>
          <span className='more-answers-btn' onClick={this.handleSeeFewerAnswersClick.bind(this)}>Collapse Answers</span>
          <span className='add-answer-btn' onClick={this.showModal}>Add Answer</span>
          <Modal className='modal-answer-submission' isShowing={this.state.modalShowing} handleClose={this.hideModal}>
          <AnswerSubmissionForm handleAnswerSubmission={this.handleAnswerSubmission.bind(this)} />
          </Modal>
        </div>
      );
    } else {
      return(
        <div className='question'>
          <h4 className='question-body'>Q: {this.props.question.question_body}</h4>
          <span className='question-helpful-rating'>Helpful?</span>
          <span className='question-helpful-btn' onClick={()=>this.handleQuestionMarkedHelpful(this.props.question.question_id)}>Yes ({this.props.question.question_helpfulness})</span>
          <span className='question-report-btn' onClick={()=>this.handleQuestionReported(this.props.question.question_id)}>Report?</span>
          <div className='answer-list'>{this.state.answersList.slice(0, 2).map((answer, i)=>{
            return(
              <div className='answer' key={i}>
              <h5 className='answer-body'>A: {answer.body}</h5>
              {/* <h5 className='answer-helpful-rating'>Helpfulness rating: {answer.helpfulness}</h5> */}
              <h5 className='answer-username'>by {answer.answerer_name}, {moment(answer.date, 'YYYYMMDD').fromNow()} </h5>
              <span className='answer-helpful-btn' onClick={()=>this.handleAnswerMarkedHelpful(answer.answer_id)}>Helpful?</span>
              <span className='answer-report-btn' onClick={()=>this.handleAnswerReport(answer.answer_id)}>Report?</span>
              </div>
            );
          })}</div>
          <span className='more-answers-btn' onClick={this.handleSeeMoreAnswersClick.bind(this)}>LOAD MORE ANSWERS</span>
          <span className='add-answer-btn' onClick={this.showModal}>Add Answer</span>
          <Modal className='modal-answer-submission' isShowing={this.state.modalShowing} handleClose={this.hideModal}>
          <AnswerSubmissionForm handleAnswerSubmission={this.handleAnswerSubmission.bind(this)} />
          </Modal>
        </div>
      );
    }
  } else {
    return(
      <div className='question-without-answers'>
        <h4 className='question-body'>Q: {this.props.question.question_body}</h4>
        <div className='no-answers-currently'>There are currently no answers for this question.</div>


        <span className='question-helpful-rating'>Helpful?</span>
        <span className='question-helpful-btn' onClick={()=>this.handleQuestionMarkedHelpful(this.props.question.question_id)}>Yes ({this.props.question.question_helpfulness})</span>
        <span className='question-report-btn' onClick={()=>this.handleQuestionReported(this.props.question.question_id)}>Report?</span>
        {/* <span className='more-answers-btn' onClick={this.handleSeeFewerAnswersClick.bind(this)}>Collapse Answers</span> */}
        <span className='add-answer-btn' onClick={this.showModal}>Add Answer</span>
        <Modal className='modal-answer-submission' isShowing={this.state.modalShowing} handleClose={this.hideModal}>
        <AnswerSubmissionForm handleAnswerSubmission={this.handleAnswerSubmission.bind(this)} />
        </Modal>
      </div>);
  }

  }
}

export default Question;