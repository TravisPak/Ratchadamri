import React from "react";

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);

    this.getPercentageRecommended = this.getPercentageRecommended.bind(this);
    this.getRatingAvg = this.getRatingAvg.bind(this);
    this.makeSVGBar = this.makeSVGBar.bind(this);
    this.getTotalRatings = this.getTotalRatings.bind(this);
    this.getPercentageOfRating = this.getPercentageOfRating.bind(this);
    this.setSVGStars = this.setSVGStars.bind(this);
  }

  getRatingAvg() {
    let totalStars = 0;
    let avgRating = 0;

    if (Object.keys(this.props.meta.ratings).length !== 0) {
      for (let key in this.props.meta.ratings) {
        totalStars += parseInt(key) * parseInt(this.props.meta.ratings[key]);
      }
      // console.log(total);
      // console.log(totalStars);

      avgRating = totalStars / this.getTotalRatings();
    }

    return avgRating.toFixed(1);
  }

  getTotalRatings() {
    let total = 0;

    if (Object.keys(this.props.meta.ratings).length !== 0) {
      for (let key in this.props.meta.ratings) {
        total += parseInt(this.props.meta.ratings[key]);
      }
    }
    return total;
  }

  getPercentageRecommended() {
    let yes = this.props.meta.recommended.true
      ? this.props.meta.recommended.true
      : 0;
    let no = this.props.meta.recommended.false
      ? this.props.meta.recommended.false
      : 0;
    let total = parseInt(yes) + parseInt(no);
    let averagePercent;
    if (total === 0) {
      averagePercent = 0;
    } else {
      averagePercent = (yes / total) * 100;
    }

    return averagePercent.toFixed(0);
  }

  setSVGStars(average) {
    let avg = Number(average);

    let array = [];

    for (let i = 0; i < 5; i++) {
      if (avg >= 1) {
        array.push(1);
      } else if (avg > 0 && avg < 1) {
        if (avg > 0.6) {
          array.push(0.7);
          console.log(
            "🚀 ~ file: RatingBreakdown.jsx ~ line 71 ~ RatingBreakdown ~ setSVGStars ~ avg ",
            avg
          );
        } else if (avg < 0.4) {
          array.push(0.3);
        } else {
          array.push(0.5);
        }
      } else {
        array.push(0);
      }
      avg -= 1;
    }

    return array.map((star, id) => {
      return this.props.makeSVGStar(star, id, 30, 30);
    });
  }

  makeSVGBar(percentFilled) {
    return (
      <svg width="70%" height="16px">
        <g className="bars">
          <rect fill="#ebebeb" width="100%" height="8px" x="5%" y="50%"></rect>
          <rect
            fill="#24BE1D"
            width={`${percentFilled}%`}
            height="8px"
            x="5%"
            y="50%"
          ></rect>
        </g>
      </svg>
    );
  }

  getPercentageOfRating(ratingTotal, totalRatings) {
    return (ratingTotal / totalRatings) * 100;
  }

  render() {
    if (!this.props.meta.characteristics) {
      return null;
    }
    return (
      <>
        <div className="rating-breakdown-container">
          <div className="rating-breakdown-title">RATINGS &#38; REVIEWS</div>
          <div className="avg-stars-container">
            <span className="rating-breakdown-avg">{this.getRatingAvg()}</span>
            <div className="rating-breakdown-stars">
              {this.setSVGStars(this.getRatingAvg())}
            </div>
          </div>
          <div className="rating-breakdown-percentage">
            {this.getPercentageRecommended()}% of reviews recommend this product
          </div>
          <div
            className="rating-breakdown-star"
            onClick={() => {
              this.props.clickRating(5);
            }}
          >
            <span className="star5-title">5 stars</span>
            {this.makeSVGBar(
              this.getPercentageOfRating(
                this.props.meta.ratings["5"],
                this.getTotalRatings()
              )
            )}
          </div>
          <div
            className="rating-breakdown-star"
            onClick={() => {
              this.props.clickRating(4);
            }}
          >
            <span className="star4-title">4 stars</span>
            {this.makeSVGBar(
              this.getPercentageOfRating(
                this.props.meta.ratings["4"],
                this.getTotalRatings()
              )
            )}
          </div>
          <div
            className="rating-breakdown-star"
            onClick={() => {
              this.props.clickRating(3);
            }}
          >
            <span className="star3-title">3 stars</span>
            {this.makeSVGBar(
              this.getPercentageOfRating(
                this.props.meta.ratings["3"],
                this.getTotalRatings()
              )
            )}
          </div>
          <div
            className="rating-breakdown-star"
            onClick={() => {
              this.props.clickRating(2);
            }}
          >
            <span className="star2-title">2 stars</span>
            {this.makeSVGBar(
              this.getPercentageOfRating(
                this.props.meta.ratings["2"],
                this.getTotalRatings()
              )
            )}
          </div>
          <div
            className="rating-breakdown-star"
            onClick={() => {
              this.props.clickRating(1);
            }}
          >
            <span className="star1-title">1 stars</span>
            {this.makeSVGBar(
              this.getPercentageOfRating(
                this.props.meta.ratings["1"],
                this.getTotalRatings()
              )
            )}
          </div>
        </div>
      </>
    );
  }
}

export default RatingBreakdown;
