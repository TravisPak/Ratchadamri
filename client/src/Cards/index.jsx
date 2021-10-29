import React from 'react';

class Cards extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  // componentDidMount () {
  //   axios.get('/qa/questions',{params:{product_id:37311,count:1}}
  //     .then((result) => console.log('result', result))
  //     .catch((err) => console.log('error', err));
  // }

  render() {
    return (
      <div>{'This is a CARD placeholder'}</div>
    )
  }
}

export default Cards;