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
      product_info: {},
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
                      styles.data.results[0].photos[0].thumbnail_url === null
                    ) {
                      relatedData[styles.data.product_id].push('https://http.cat/404');
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

      })
      .catch((err) => console.log("Error after loop", err))
      // .then(
      //   // console.log('relatedData at end', relatedData);
      // this.setState({ averages: relatedData })
      // );
    //iterate through related
    //request rating
    //add to related for each item
    axios.get(`products/${this.state.product_id}`)
      .then((result) => {this.setState({product_info: result.data})})
  }

  render() {
    return (
      <div className="related">
        {
          /* iterate over state.related
        create new span with CATEGORY/NAME/PRICE/STAR RATING */
          Object.keys(this.state.relatedInfo).map((key, index) => (
            <div className="item" key={index}>
              <img className="item-img" src={this.state.relatedInfo[key][2]} />
              <br />
              <span className="item-category item-text" >{this.state.relatedInfo[key][0].category}</span>
              <br />
              <span className="item-name item-text">{this.state.relatedInfo[key][0].name}</span>
              {/* <br /> */}
              <span className="item-price item-text">{'$' + this.state.relatedInfo[key][0].default_price}</span>
              <br />
              <span className="stars item-text">{'Stars: ' + this.state.relatedInfo[key][1]}</span>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Cards;
