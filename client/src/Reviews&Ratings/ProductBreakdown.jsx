import React from "react";

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);

    this.makeSVGtriangle = this.makeSVGtriangle.bind(this);
    this.triangleSVGPosition = this.triangleSVGPosition.bind(this);
  }

  makeSVGtriangle(percentFilled) {
    return (
      <svg
        className="triangle"
        x={`${percentFilled}%`}
        y="1px"
        width="30"
        height="30"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <polygon points="0 100, 50 15 ,100 100" />
      </svg>
    );
  }

  triangleSVGPosition(value) {
    if (value === null) {
      return 0;
    }
    return (parseInt(value) * 66) / 5;
  }

  render() {
    if (!this.props.characteristics) {
      return null;
    }
    return (
      <div className="product-breakdown-container">
        {Object.keys(this.props.characteristics).map((characteristic, id) => {
          return (
            <div className="product-characteristic" key={id}>
              <span className="characteristic">{characteristic}</span>

              <svg
                width="100%"
                height="20px"
                style={{ display: "inline-block" }}
              >
                <g>
                  <rect fill="#ebebeb" width="32%" height="8px" x="0%"></rect>
                  <text x="0%" y="95%" fontSize="10">
                    {this.props.selections[characteristic][0]}
                  </text>
                  <rect fill="#ebebeb" width="32%" height="8px" x="33%"></rect>
                  <text x="33%" y="95%" fontSize="10">
                    {this.props.selections[characteristic][2]}
                  </text>
                  <rect fill="#ebebeb" width="32%" height="8px" x="66%"></rect>
                  <text x="66%" y="95%" fontSize="10">
                    {this.props.selections[characteristic][4]}
                  </text>

                  {this.makeSVGtriangle(
                    this.triangleSVGPosition(
                      this.props.characteristics[characteristic].value
                    )
                  )}
                </g>
              </svg>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProductBreakdown;
