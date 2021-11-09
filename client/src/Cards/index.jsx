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
      product_rating: 0,
      product_url: "",
      clickedProduct: "",
      clickedProductInfo: [],
      relatedInfo: {},
      modalShowing: false,
      outfit: [],
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.addItem = this.addItem.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidUpdate(prevProps) {
    //add results to newRelated array

    //iterate through newrelated again
    //request url
    //add to newrelated for each item
    if (
      this.props.product.currentProduct.id !== undefined &&
      this.props.product.currentProduct.id !==
        prevProps.product.currentProduct.id
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
                          // console.log(
                          //   "this.props.props",
                          //   this.props.product.currentProduct.id
                          // );
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

  //CARD CLICK
  clickHandler(input) {
    // console.log('this.props', this.props)
    // console.log("input", input);
    this.props.pageChange(input)
  }

  //ADD ITEM TO OUTFIT
  addItem() {
    var newUrl;
    var rating;
    var outfitAddition = [this.props.product.currentProduct];

    axios
      .get(`/products/${this.props.product.currentProduct.id}/styles`)
      .then((styles) => {
        if (styles.data.results[0].photos[0].thumbnail_url === null) {
          outfitAddition[2] = "https://http.cat/404";
          axios
            .get(
              `reviews/meta?product_id=${this.props.product.currentProduct.id}`
            )
            .then((response) => {
              var avg = findReviewAverage(response.data.ratings);
              outfitAddition[1] = avg;
              this.setState({
                outfit: this.state.outfit.concat([outfitAddition]),
              });
            });
        } else {
          outfitAddition[2] = styles.data.results[0].photos[0].thumbnail_url;
          axios
            .get(
              `reviews/meta?product_id=${this.props.product.currentProduct.id}`
            )
            .then((response) => {
              var avg = findReviewAverage(response.data.ratings);
              outfitAddition[1] = avg;
              this.setState({
                outfit: this.state.outfit.concat([outfitAddition]),
              });
            });
        }
      });
  }

  //REMOVE ITEM
  removeItem (input) {
      var newOutfit = [...this.state.outfit]
      var filteredOutfit = newOutfit.filter((item) => (item[0].id != input));
      this.setState({outfit: filteredOutfit})
  }

  render() {
    return (
      <div className="cards-component">
        <div className="cards">
          {
            /* iterate over state.related
        create new span with CATEGORY/NAME/PRICE/STAR RATING */
            Object.keys(this.state.relatedInfo).map((key, index) => (
              <div className="item" key={index}
              >
                <a
                  className="item-action-button"
                  onClick={() => {
                    this.showModal(this.state.relatedInfo[key][0]);
                  }}
                >
                  ⭐
                </a>
                <img
                  className="item-img"
                  src={this.state.relatedInfo[key][2]} onClick={() => {this.clickHandler(this.state.relatedInfo[key][0].id)}}
                />
                <br />
                <div className="card-body" onClick={() => {this.clickHandler(this.state.relatedInfo[key][0].id)}}>
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
              </div>
            ))
          }

          <Modal
            isShowing={this.state.modalShowing}
            handleClose={this.hideModal}
          >
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
          <button type="submit" onClick={this.addItem}>
            Add to Outfit
          </button>
          <div className="cards">
            {this.state.outfit.map((item, index) => (
              <div className="item" key={index}>
                <a
                  className="item-action-button"
                  onClick={() => {
                    this.removeItem(item[0].id);
                  }}
                >
                  ❌
                </a>
                <img className="item-img" src={item[2]} />
                <br />
                <span className="item-category item-text">
                  {item[0].category}
                </span>
                <br />

                <span className="item-name item-text">{item[0].name}</span>
                <span className="item-price item-text">
                  {"$" + item[0].default_price}
                </span>
                <br />
                <span className="stars item-text">{"Stars: " + item[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
