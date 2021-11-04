import React from "react";
import axios from "axios";
import cardHelpers from './helpers.js';
const findReviewAverage = cardHelpers.cardHelpers.findReviewAverage;
console.log('findReviewAverage', findReviewAverage);

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: "37311",
      related: [],
      averages: {},
    };
  }

  componentDidMount() {
    //add results to newRelated array

      //iterate through newrelated again
        //request url
          //add to newrelated for each item
    var newAverages = {};
    axios
      .get(`/products/${this.state.product_id}/related`)
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          axios
            .get(`products/${res.data[i]}`)
            .then((result) => {
              newAverages[result.data.id] = [result.data];
            })
            .catch((err) => {
              console.log(err);
            })
            .then(
              axios
                .get(`reviews/meta?product_id=${res.data[i]}`)
                  .then((response) => {
                    var avg = findReviewAverage(response.data.ratings);
                    console.log('response.data', response.data);
                    // console.log('avg', avg);
                    newAverages[response.data.product_id].push(avg);
                    console.log('newAverages', newAverages);
                    }
                  )
            )
            .then(
              axios
              .get(`/products/${res.data[i]}/styles`)
                .then((styles) => {
                  console.log('styles.data', styles.data);
                  if (styles.data.results[0].photos[0].thumbnail_url === null) {
                    newAverages[styles.data.product_id].push('No Photos');
                  } else {
                  newAverages[styles.data.product_id].push(styles.data.results[0].photos[0].thumbnail_url)}
                  // console.log('newAverages after URL', newAverages);
                })
            )
            .then(this.setState({averages: newAverages}))

        }
        console.log("res from related req", res.data);
      })
      .catch((err) => console.log(err));
      //iterate through related
        //request rating
          //add to related for each item


  }

  render() {
    return (
      <div>
        {
          /* iterate over state.related
        create new span with CATEGORY/NAME/PRICE/STAR RATING */
          this.state.related.map((item) => (
            <div className="item">
              <span className="item-name">{item.name}</span>
              <span className="item-category">{item.category}</span>
              <span className="item-price">{item.default_price}</span>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Cards;
