import React from "react";
import List from "./List.jsx";
import RatingBreakdown from "./RatingBreakdown.jsx";
import ProductBreakdown from './ProductBreakdown.jsx';
import axios from "axios";

class ReviewsSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShowing: false,
      reviews: [],
      meta: [],
      filteredRatings: [
        {rating:1,isOn:false},
        {rating:2,isOn:false},
        {rating:3,isOn:false},
        {rating:4,isOn:false},
        {rating:5,isOn:false}
      ],
      characteristicSelections : {
        Size: [
          "A size too small",
          "1/2 a size too small",
          "Perfect",
          "1/2 a size too big",
          "A size too wide",
        ],
        Width: [
          "Too narrow",
          "Slighty narrow",
          "Perfect",
          "Slighthy wide",
          "Too wide",
        ],
        Comfort: [
          "Uncomfortable",
          "Slightly uncomfortable",
          "Ok",
          "Comfortable",
          "Perfect",
        ],
        Quality: [
          "Poor",
          "Below average",
          "What I expected",
          "Pretty great",
          "Perfect",
        ],
        Length: [
          "Runs Short",
          "Runs slighty short",
          "Perfect",
          "Runs slightly long",
          "Runs long",
        ],
        Fit: [
          "Runs tight",
          "Runs slightly tight",
          "Perfect",
          "Runs slightly long",
          "Runs long",
        ],
      }

    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.clickRating = this.clickRating.bind(this);
  }

  componentDidUpdate(prevProps,prevState) {

    if(prevProps.productId !== this.props.productId){



      let productId = this.props.productId;

      axios
        .get("/reviews/", {
          params: {
            product_id: productId,
            page: 1,
            count: 1000,
            sort: "Relevant",
          },
        })
        .then(({ data }) => {
          // console.log("Data:", data.results);
          this.setState({ reviews: data.results });
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("/reviews/meta", { params: { product_id: productId } })
        .then(({ data }) => {
          // console.log("Meta Data:", data);
          this.setState({ meta: data });
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }

  showModal() {
    this.setState({ modalShowing: true });
  }

  hideModal() {
    this.setState({ modalShowing: false });
  }

  clickRating(rating) {
    // console.log(`Rating to filter by ${rating}`);
    let filteredRatings = [...this.state.filteredRatings];

    filteredRatings[rating-1].isOn = !filteredRatings[rating-1].isOn;
    this.setState({ filteredRatings : filteredRatings });
  }

  render() {
    return (
      <div className="reviews-ratings-overall-container">

        <RatingBreakdown
          meta={this.state.meta}
          clickRating={this.clickRating}

        />
        <ProductBreakdown characteristics={this.state.meta.characteristics} selections={this.state.characteristicSelections}/>
        <List
          reviews={this.state.reviews}
          productId={this.props.productId}
          characteristics={this.state.meta.characteristics}
          ratings={this.state.meta.ratings}
          showModal={this.showModal}
          filteredRatings={this.state.filteredRatings}
          selections = {this.state.characteristicSelections}
        />



      </div>
    );
  }
}

export default ReviewsSection;
