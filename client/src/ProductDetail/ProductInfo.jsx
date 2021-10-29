import React from 'react';
import StyleSelector from './StyleSelector.jsx';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <div className="productName">{this.props.product.name} </div>
        <div className="productCategory">{this.props.product.category} </div>
        <div className="price">{this.props.product.default_price} </div>
        <StyleSelector />
        <div className="productDesc">{this.props.product.description} </div>
        <div className="socialMedia">social media buttons here </div>
      </div>
    )
  }
}

export default ProductInfo;