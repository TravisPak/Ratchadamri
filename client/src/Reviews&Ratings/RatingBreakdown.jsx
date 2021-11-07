import React from "react";

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);


    this.setStars = this.setStars.bind(this);
    this.getPercentageRecommended = this.getPercentageRecommended.bind(this);
    this.getRatingAvg = this.getRatingAvg.bind(this);



  }

  getRatingAvg() {
    let total = 0;
    let totalStars = 0;

    for (let key in this.props.meta.ratings) {

      total += parseInt(this.props.meta.ratings[key]);
      totalStars += parseInt(key) * parseInt(this.props.meta.ratings[key]);
    }
    // console.log(total);
    // console.log(totalStars);

    let avgRating = totalStars / total;



    return (Math.round(avgRating * 10) / 10);
  }


  getPercentageRecommended() {
    let yes = this.props.meta.recommended.true ? this.props.meta.recommended.true:0;
    let no = this.props.meta.recommended.false ? this.props.meta.recommended.false:0;
    let total = parseInt(yes) + parseInt(no);
    let averagePercent;
    if(total === 0){
      averagePercent = 0;
    }
      averagePercent = (yes / total) * 100;

    return averagePercent;
  }

  setStars(average) {
    let avg = Math.round(average);

    if (avg === 1) {
      return (
        <div>
          <a>⭐</a>
          <a className="faded-star">⭐</a>
          <a className="faded-star">⭐</a>
          <a className="faded-star">⭐</a>
          <a className="faded-star">⭐</a>
        </div>
      );
    } else if (avg === 2) {
      return (
        <div>
          <a>⭐</a>
          <a>⭐</a>
          <a className="faded-star">⭐</a>
          <a className="faded-star">⭐</a>
          <a className="faded-star">⭐</a>
        </div>
      );
    } else if (avg === 3) {
      return (
        <div>
          <a>⭐</a>
          <a>⭐</a>
          <a>⭐</a>
          <a className="faded-star">⭐</a>
          <a className="faded-star">⭐</a>
        </div>
      );
    } else if (avg === 4) {
      return (
        <div>
          <a>⭐</a>
          <a>⭐</a>
          <a>⭐</a>
          <a>⭐</a>
          <a className="faded-star">⭐</a>
        </div>
      );
    } else if(avg === 5){
      return (
        <div>
          <a>⭐</a>
          <a>⭐</a>
          <a>⭐</a>
          <a>⭐</a>
          <a>⭐</a>
        </div>
      );
    } else {
      return (
        <div>
          <a className="faded-star">⭐</a>
          <a className="faded-star">⭐</a>
          <a className="faded-star">⭐</a>
          <a className="faded-star">⭐</a>
          <a className="faded-star">⭐</a>
        </div>
      )

    }
  }

  render() {
    if (!this.props.meta.characteristics) {
      return null;
    }
    return (
      <div className="rating-breakdown-container">
        <div className="rating-breakdown-title">RATINGS &#38; REVIEWS</div>
        <div className="rating-breakdown-avg">{this.getRatingAvg()}</div>
        <div className="rating-breakdown-stars">{this.setStars(this.getRatingAvg())}</div>
        <div className="rating-breakdown-percentage">

          {this.getPercentageRecommended()}% of reviews recommend this product
        </div>
        <div className="rating-breakdown-star5"
          onClick={() => {
            this.props.clickRating(5);
          }}
        >
          <span className="star5-title">5 stars</span>
          <span className="star5-total">#{this.props.meta.ratings["5"]}</span>
        </div>
        <div className="rating-breakdown-star4"
          onClick={() => {
            this.props.clickRating(4);
          }}
        >
          <span className="star4-title">4 stars</span>
          <span className="star4-total">#{this.props.meta.ratings["4"]}</span>
        </div>
        <div className="rating-breakdown-star3"
          onClick={() => {
            this.props.clickRating(3);
          }}
        >
          <span className="star4-title">3 stars</span>
          <span className="star4-total">#{this.props.meta.ratings["3"]}</span>
        </div>
        <div className="rating-breakdown-star2"
          onClick={() => {
            this.props.clickRating(2);
          }}
        >
          <span className="star2-title">2 stars</span>
          <span className="star2-total">#{this.props.meta.ratings["2"]}</span>
        </div>
        <div className="rating-breakdown-star1"
          onClick={() => {
            this.props.clickRating(1);
          }}
        >
          <span className="star1-title">1 stars</span>
          <span className="star1-total">#{this.props.meta.ratings["1"]}</span>
        </div>
      </div>
    );
  }
}

export default RatingBreakdown;
