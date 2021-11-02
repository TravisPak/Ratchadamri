import React from "react";
import axios from "axios";

var Thumbnails

class Thumbnails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      styles: [],
    };
    this.getPhotos = this.getPhotos.bind(this);
  }

  getPhotos() {

    this.props.styles.map((eachStyle)  => {
      this.setState({ styles: [...this.state.styles, eachStyle] });
    });

    console.log('getPhotos', this.state.styles);
  }

  componentDidUpdate(prevProps) {
    if (this.props.styles !== prevProps.styles) {
      this.getPhotos();
    }
  }

  render() {
    console.log('image gall, this.props: ', this.props.styles);
    return (
      <div className="image-gallery">
        <img className="main-image" src={this.state.photos} />
      </div>
    );
  }
}

export default Thumbnails;