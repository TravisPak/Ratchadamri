import React from 'react';


class QuestionSubmissionForm extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      question: ''
    };
    //bindings:
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQuestionChange(event){
    this.setState({question: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.handleQuestionSubmission(this.state.question);
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Ask question here" value={this.state.question} onChange={this.handleQuestionChange}>
          </input>
          <input type='submit' value='Submit'/>
        </form>
      </div>
     );
  }
}

export default QuestionSubmissionForm;