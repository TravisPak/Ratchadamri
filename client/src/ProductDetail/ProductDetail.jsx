import React from "react";
import axios from "axios";
import ProductInfo from "./ProductInfo.jsx";
import ImageGallery from "./ImageGallery.jsx";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: [],
      currentStyle: {}
    };
    this.getStyles = this.getStyles.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
  }

  // on click to styleSelector item, update current style
  updateStyle(clickedStyle) {
    this.setState({ currentStyle: clickedStyle })
  }

  // Get all styles from API, and set styles states
  getStyles() {
    axios
      .get(`/products/${this.props.product.id}/styles`)
      .then((response) => {
        // update current style index to change displayed style in the future
        this.setState({ styles: response.data.results, currentStyle: response.data.results[0]});
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // wait for API response to getStyles
  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.getStyles();
    }
  }

  render() {
    return (
      <div className="product-detail">
        <ProductInfo product={this.props.product} styles={this.state.styles} updateStyle={this.updateStyle}/>
        <ImageGallery currentStylePhotos={this.state.currentStyle.photos} />
        <div className="product-desc">{this.props.product.description} </div>
      </div>

    );
  }
}

export default ProductDetail;
