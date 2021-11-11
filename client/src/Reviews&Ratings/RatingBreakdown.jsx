import React from "react";

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);

    this.setStars = this.setStars.bind(this);
    this.getPercentageRecommended = this.getPercentageRecommended.bind(this);
    this.getRatingAvg = this.getRatingAvg.bind(this);
    this.makeSVGBar = this.makeSVGBar.bind(this);
    this.getTotalRatings = this.getTotalRatings.bind(this);
    this.getPercentageOfRating = this.getPercentageOfRating.bind(this);
    this.makeSVGStar = this.makeSVGStar.bind(this);
    this.setSVGs = this.setSVGs.bind(this);
  }

  getRatingAvg() {
    let totalStars = 0;
    let avgRating = 0;

    if(Object.keys(this.props.meta.ratings).length !== 0){

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

    if(Object.keys(this.props.meta.ratings).length !== 0){

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
    }else{

      averagePercent = (yes / total) * 100;
    }

    return averagePercent.toFixed(0);
  }

  setSVGs(){
    return <div>
      {this.makeSVGStar(50)}
      {this.makeSVGStar(100)}

    </div>
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
    } else if (avg === 5) {
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
      );
    }
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

  makeSVGStar(percentage){
    return <svg

          width="30"
          height="30"

        >
          <defs>
            <linearGradient id="half">
              <stop offset={`${percentage}%`} stop-color="yellow" />
              <stop offset="50%" stop-color="black" />
            </linearGradient>
          </defs>
          <g >
            <polygon fill="url(#half)"
              points="12.5,1.25 5,22.5 23.75,7.5 1.25,7.5 20,22.5"


            />
          </g>
        </svg>
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
      <div className="svg-stars">

          {this.setSVGs()}
      </div>
      <div className="rating-breakdown-container">
        <div className="rating-breakdown-title">RATINGS &#38; REVIEWS</div>
        <div className="avg-stars-container">
        <span className="rating-breakdown-avg">{this.getRatingAvg()}</span>
        <div className="rating-breakdown-stars">
          {this.setStars(this.getRatingAvg())}

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
