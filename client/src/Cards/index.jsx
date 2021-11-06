import React from 'react';
import axios from 'axios';

class Cards extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      product_id: '37311'
    };
  }


  componentDidMount () {

      axios.get(`/products/${this.state.product_id}/related`)
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            axios.get(`products/${res.data[i]}`)
              .then((result) => {/* console.log(result) */})
              .catch((err)=>{/* console.log(err) */});
          }
          // console.log(res.data);
        })
        .catch((err) => console.log(err));


  }

  render() {
    return (
      <div>{'This is a CARD placeholder'}</div>
    )
  }
}

export default Cards;