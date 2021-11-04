import React from "react";

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStyle: 0,
    };
    this.updateCheck = this.updateCheck.bind(this);
    this.updateStyleIndex = this.updateStyleIndex.bind(this);
  }

  updateCheck(event, styles) {
    console.log(styles);
    event.target.classList.toggle("clicked")
  }

  updateStyleIndex(index) {
    this.setState({ selectedStyle: index });
  }

  render() {
    var currentStyle = this.props.styles[this.state.selectedStyle];
    return (
      <div className="style-selector">
        <div className="style-name-display">
          STYLE > {currentStyle ? currentStyle.name : ""}
        </div>
        <div className="styles">
          {this.props.styles
            ? this.props.styles.map((style, key) => {
                return (
                  <img
                    src={style.photos[0].thumbnail_url}
                    key={key}
                    className="style-image"
                    onClick={(clicked) => {
                      this.props.updateStyle(this.props.styles[key]);
                      this.updateStyleIndex(key);
                      this.updateCheck(clicked);
                    }}
                  />
                );
              })
            : ""}
        </div>
      </div>
    );
  }
}

export default StyleSelector;
