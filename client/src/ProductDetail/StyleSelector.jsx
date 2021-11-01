import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

  }

  getStyles() {
    axios.get(`/products/${this.props.state.product.product_id}/styles`)
      .then((response) => {
        // console.log(response);
      })
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default StyleSelector;