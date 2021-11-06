import React from 'react';

class QuestionSubmissionForm extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      question: '',
      nickname: '',
      email: ''
    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNicknameChange=this.handleNicknameChange.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
  }

  handleQuestionChange(event){
    this.setState({question: event.target.value});
  }

  handleNicknameChange(event){
    this.setState({nickname: event.target.value});
  }
  
  handleEmailChange(event){
    this.setState({email: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.handleQuestionSubmission(this.state.question, this.state.nickname, this.state.email);
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Ask question here" value={this.state.question} onChange={this.handleQuestionChange}>
          </input>
          <input placeholder="What is your nickname?" value={this.state.nickname} onChange={this.handleNicknameChange}>
          </input>
          <h5>For privacy reasons, do not use your full name or email address</h5>
          <input placeholder="Your email" value={this.state.email} onChange={this.handleEmailChange}>
          </input>
          <h5> For authentication reasons, you will not be emailed </h5>
          <input type='submit' value='Submit'/>
        </form>
      </div>
     );
  }
}

export default QuestionSubmissionForm;