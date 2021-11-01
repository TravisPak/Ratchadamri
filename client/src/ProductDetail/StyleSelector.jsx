import React from 'react';
import axios from 'axios';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.getStyles = this.getStyles.bind(this);
  }

  getStyles() {
    console.log('product id', this.props.product.id);
    axios.get(`/products/${this.props.product.id}/styles`)
      .then((response) => {
        console.log('response', response);
      })
  }

  render() {
    return (
      <div>
        {/* {console.log(this.getStyles())} */}
      </div>
    )
  }
}

export default StyleSelector;