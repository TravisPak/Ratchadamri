import React from "react";
import StyleSelector from "./StyleSelector.jsx";
import DropDowns from "./DropDowns.jsx";

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var product = this.props.product;
    var current = this.props.currentStyle;
    var salePrice = this.props.currentStyle.sale_price;
    return (
      <div className="product-info">
        <div className="product-category">{product.category} </div>
        <div className="product-name">{product.name} </div>

        <div className="prices">
          <div className={current.sale_price ? "original-price strikethrough" : "original-price"}>
            $ {current.original_price}
          </div>
          <div className="sale-price">{current.sale_price ? "$ " + current.sale_price : ""} </div>
        </div>
        <StyleSelector product={product} styles={this.props.styles} updateStyle={this.props.updateStyle} />
        <DropDowns currentStyle={this.props.currentStyle} />
        <div className="social-media">social media buttons here </div>
      </div>
    );
  }
}

export default ProductInfo;
