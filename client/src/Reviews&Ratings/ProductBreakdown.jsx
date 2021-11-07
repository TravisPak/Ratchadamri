import React from "react";

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
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
              {characteristic}
              <br></br>
              <svg width="100%" height="24px">
                <g>
                  <rect fill="#ebebeb" width="27%" height="8px" x="0%"></rect>
                  <text x="0%" y="95%" fontSize="10">
                    {this.props.selections[characteristic][0]}
                  </text>
                  <rect fill="#ebebeb" width="27%" height="8px" x="33%"></rect>
                  <text x="45%" y="95%" fontSize="10">
                    {this.props.selections[characteristic][2]}
                  </text>
                  <rect fill="#ebebeb" width="27%" height="8px" x="66%"></rect>
                  <text x="90%" y="95%" fontSize="10">
                    {this.props.selections[characteristic][4]}
                  </text>
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
