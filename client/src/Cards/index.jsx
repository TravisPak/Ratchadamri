import React from "react";
import axios from "axios";
import cardHelpers from "./helpers.js";
import Modal from "./Modal.jsx";
const findReviewAverage = cardHelpers.cardHelpers.findReviewAverage;

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: "37311",
      product_info: {},
      clickedProduct: "",
      clickedProductInfo: [],
      relatedInfo: {},
      modalShowing: false,
      outfit: [],
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  componentDidUpdate(prevProps) {
    //add results to newRelated array

    //iterate through newrelated again
    //request url
    //add to newrelated for each item
    if (
      this.props.product.currentProduct.id !== undefined &&
      this.props.product.currentProduct.id !== prevProps.product.currentProduct.id
    ) {
      var relatedData = {};
      axios
        .get(`/products/${this.props.product.currentProduct.id}/related`)
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            axios
              .get(`products/${res.data[i]}`)
              .then((result) => {
                relatedData[result.data.id] = [result.data];
                return axios
                  .get(`reviews/meta?product_id=${result.data.id}`)
                  .then((response) => {
                    var avg = findReviewAverage(response.data.ratings);

                    // console.log('avg', avg);
                    relatedData[response.data.product_id].push(avg);

                    return axios
                      .get(`/products/${response.data.product_id}/styles`)
                      .then((styles) => {
                        if (
                          styles.data.results[0].photos[0].thumbnail_url ===
                          null
                        ) {
                          relatedData[styles.data.product_id].push(
                            "https://http.cat/404"
                          );
                          this.setState({
                            relatedInfo: relatedData,
                            product_id: this.props.product.currentProduct.id,
                            product_info: this.props.product.currentProduct,
                           });
                          console.log(
                            "this.props.props",
                            this.props.product.currentProduct.id
                          );
                        } else {
                          relatedData[styles.data.product_id].push(
                            styles.data.results[0].photos[0].thumbnail_url
                          );
                          this.setState({
                            relatedInfo: relatedData,
                            product_id: this.props.product.currentProduct.id,
                            product_info: this.props.product.currentProduct,
                          });
                        }
                        // console.log('relatedData after URL', relatedData);
                      });
                  });
              })
              .catch((error) => console.log("Error in loop: ", error));
          }
        })
        .catch((err) => console.log("Error after loop", err));

    }
  }

  //SHOW MODAL
  showModal(e) {
    // console.log(e.name);
    this.setState({
      modalShowing: true,
      clickedProductInfo: e.features,
      clickedProduct: e.name,
    });
  }

  //HIDE MODAL
  hideModal() {
    this.setState({ modalShowing: false });
  }

  //ADD ITEM TO OUTFIT
  addItem () {
    this.setState({ outfit: this.state.outfit.concat(this.state.product_info)})
  }

  render() {
    return (
      <div className="cards">
      <div className="related">
        {
          /* iterate over state.related
        create new span with CATEGORY/NAME/PRICE/STAR RATING */
          Object.keys(this.state.relatedInfo).map((key, index) => (
            <div className="item" key={index}>
                            <a className="item-action-button"
                onClick={() => {
                  this.showModal(this.state.relatedInfo[key][0]);
                }}
              >
                ⭐
              </a>
              <img className="item-img" src={this.state.relatedInfo[key][2]} />
              <br />
              <span className="item-category item-text">
                {this.state.relatedInfo[key][0].category}
              </span>
              <br />

              <span className="item-name item-text">
                {this.state.relatedInfo[key][0].name}
              </span>
              <span className="item-price item-text">
                {"$" + this.state.relatedInfo[key][0].default_price}
              </span>
              <br />
              <span className="stars item-text">
                {"Stars: " + this.state.relatedInfo[key][1]}
              </span>

            </div>
          ))
        }

        <Modal isShowing={this.state.modalShowing} handleClose={this.hideModal}>
          <div>
            <table className="related-modal">
              <thead>
                <tr>
                  <td>{this.state.clickedProduct}</td>
                  <td>Characteristics</td>
                  <td>{this.state.product_info.name}</td>
                </tr>
              </thead>
              <tbody>
                {this.state.clickedProductInfo.map((feature) => {
                  return (
                    <tr>
                      <td>Placeholder</td>
                      <td>{feature.feature}</td>
                      <td>Placeholder</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Modal>

      </div>
      <div className="outfit">
      <button type="submit" onClick={this.addItem}>Add to Outfit</button>
    </div>
    </div>
    );
  }
}

export default Cards;
