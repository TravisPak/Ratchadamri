import React from 'react';
import ProductInfo from './ProductInfo.jsx';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ProductInfo product={this.props.product}/>
      </div>
    )
  }
}

export default ProductDetail;