import React from 'react';
import StyleSelector from './StyleSelector.jsx';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    var product = this.props.product;
    return (
      <div>
        <div className="productCategory">{product.category} </div>
        <div className="productName">{product.name} </div>
        <div className="price">{product.default_price} </div>
        <StyleSelector product={product}/>
        <div className="productDesc">{product.description} </div>
        <div className="socialMedia">social media buttons here </div>
      </div>
    )
  }
}

export default ProductInfo;