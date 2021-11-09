import React from "react";

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);

    this.makeSVGtriangle = this.makeSVGtriangle.bind(this);
    this.triangleSVGPosition = this.triangleSVGPosition.bind(this);
  }

  makeSVGtriangle(percentFilled){
    return <svg x={`${percentFilled}%`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.887l8.468 14.113h-16.936l8.468-14.113zm0-3.887l-12 20h24l-12-20z"/></svg>
  }

  triangleSVGPosition(value){
    return (parseInt(value) * 66)/5;
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
              {this.triangleSVGPosition(this.props.characteristics[characteristic].value)}

              <svg width="100%" height="24px">
                <g>

                  {this.makeSVGtriangle(this.triangleSVGPosition(this.props.characteristics[characteristic].value))}
                  <rect fill="#ebebeb" width="27%" height="8px" x="0%"></rect>
                  <text x="0%" y="95%" fontSize="10">
                    {this.props.selections[characteristic][0]}
                  </text>
                  <rect fill="#ebebeb" width="27%" height="8px" x="33%"></rect>
                  <text x="33%" y="95%" fontSize="10">
                    {this.props.selections[characteristic][2]}
                  </text>
                  <rect fill="#ebebeb" width="27%" height="8px" x="66%"></rect>
                  <text x="66%" y="95%" fontSize="10">
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
