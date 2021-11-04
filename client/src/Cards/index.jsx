import React from "react";
import axios from "axios";
import cardHelpers from "./helpers.js";
const findReviewAverage = cardHelpers.cardHelpers.findReviewAverage;
console.log("findReviewAverage", findReviewAverage);

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: "37311",
      related: [],
      relatedInfo: {},
    };
  }

  componentDidMount() {
    //add results to newRelated array

    //iterate through newrelated again
    //request url
    //add to newrelated for each item
    var relatedData = {};
    axios
      .get(`/products/${this.state.product_id}/related`)
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          axios.get(`products/${res.data[i]}`).then((result) => {
            console.log("result.data", result.data);
            relatedData[result.data.id] = [result.data];
            return axios
              .get(`reviews/meta?product_id=${result.data.id}`)
              .then((response) => {
                var avg = findReviewAverage(response.data.ratings);
                console.log("response.data", response.data);
                // console.log('avg', avg);
                relatedData[response.data.product_id].push(avg);
                console.log("relatedData", relatedData);
                return axios
                  .get(`/products/${response.data.product_id}/styles`)
                  .then((styles) => {
                    console.log("styles.data", styles.data);
                    if (
                      styles.data.results[0].photos[0].thumbnail_url === null
                    ) {
                      relatedData[styles.data.product_id].push("No Photos");
                      this.setState({ relatedInfo: relatedData })
                    } else {
                      relatedData[styles.data.product_id].push(
                        styles.data.results[0].photos[0].thumbnail_url
                      );
                      this.setState({ relatedInfo: relatedData })
                    }
                    // console.log('relatedData after URL', relatedData);
                  });
              });
          })
          .catch((error) => console.log('Error in loop: ', error))
        }
        console.log("res from related req", res.data);
      })
      .catch((err) => console.log("Error after loop", err))
      // .then(
      //   // console.log('relatedData at end', relatedData);
      // this.setState({ averages: relatedData })
      // );
    //iterate through related
    //request rating
    //add to related for each item
  }

  render() {
    return (
      <div className="related">
        {
          /* iterate over state.related
        create new span with CATEGORY/NAME/PRICE/STAR RATING */
          Object.keys(this.state.relatedInfo).map((key) => (
            <div className="item">
              <span className="item-name">{this.state.relatedInfo[key][0].name}</span>
              <br />
              <span className="item-category">{'Category: ' + this.state.relatedInfo[key][0].category}</span>
              <br />
              <span className="item-price">{'Price: ' + this.state.relatedInfo[key][0].default_price}</span>
              <br />
              <span className="stars">{'Stars: ' + this.state.relatedInfo[key][1]}</span>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Cards;
