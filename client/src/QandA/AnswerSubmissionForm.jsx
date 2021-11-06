import React from 'react';

class AnswerSubmissionForm extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      answer: '',
      nickname: '',
      email: ''
    };
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNicknameChange=this.handleNicknameChange.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
  }

  handleAnswerChange(event){
    this.setState({answer: event.target.value});
  }

  handleNicknameChange(event){
    this.setState({nickname: event.target.value});
  }
  
  handleEmailChange(event){
    this.setState({email: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.handleAnswerSubmission(this.state.answer, this.state.nickname, this.state.email);
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Your answer" value={this.state.answer} onChange={this.handleAnswerChange}>
          </input>
          <input placeholder="What is your nickname?" value={this.state.nickname} onChange={this.handleNicknameChange}>
          </input>
          <h5>For privacy reasons, do not use your full name or email address</h5>
          <input placeholder="Your email" value={this.state.email} onChange={this.handleEmailChange}>
          </input>
          <h5> For authentication reasons, you will not be emailed </h5>
          <h5>placeholder for photos</h5>
          <input type='submit' value='Submit Answer'/>
        </form>
      </div>
     );
  }
}

export default AnswerSubmissionForm;