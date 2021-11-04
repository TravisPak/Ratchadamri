import React from "react";
import StyleSelector from "./StyleSelector.jsx";
import DropDowns from "./DropDowns.jsx";

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
        <div className="price">$ {product.default_price} </div>
        <StyleSelector product={product} styles={this.props.styles} updateStyle={this.props.updateStyle}/>
        <div className="social-media">social media buttons here </div>
        <DropDowns currentStyle={this.props.currentStyle}/>
      </div>
    );
  }
}

export default ProductInfo;
