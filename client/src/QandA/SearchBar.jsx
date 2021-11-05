import React from 'react';


class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state={};

    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    console.log('submit clicked');
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          id="header-search"
          placeholder="Have a question?"
          onChange={this.props.handleSearch}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchBar;