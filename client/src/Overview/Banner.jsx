import React from 'react';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

  }

  render() {
    return (
      <div className="banner">
        <h1 className="logo">Logo</h1>
        <form onSubmit={this.handleSubmit} className="search-bar">
          <label>
            Search Item:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Banner;