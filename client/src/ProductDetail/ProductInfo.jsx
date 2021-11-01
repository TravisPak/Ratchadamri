import React from 'react';
import StyleSelector from './StyleSelector.jsx';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    var product = this.props.product;
    return (
      <div className="product-info">
        <div className="product-category">{product.category} </div>
        <div className="product-name">{product.name} </div>
        <div className="price">{product.default_price} </div>
        <StyleSelector product={product}/>
        <div className="product-desc">{product.description} </div>
        <div className="social-media">social media buttons here </div>
      </div>
    )
  }
}

export default ProductInfo;