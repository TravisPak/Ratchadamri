import React from "react";
import axios from "axios";
import { LeftArrow, RightArrow } from "./Carousel.jsx";

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      activeIndex: 0,
      length: 0,
    };
    this.englargeThumbnail = this.enlargeThumbnail.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
  }

  goToPrevSlide() {
    var index = this.state.activeIndex;
    var length = this.state.length;
    if (index < 1) {
      index = length - 1;
    } else {
      index--;
    }
    this.setState({ activeIndex: index });
  }

  goToNextSlide() {
    var index = this.state.activeIndex;
    var length = this.state.length;
    if (index === length - 1) {
      index = 0;
    } else {
      index++;
    }
    this.setState({ activeIndex: index });
  }

  // ENLARGE THUMBNAIL PHOTO ON CLICK
  enlargeThumbnail(clickedPhoto) {
    var clicked = this.state.photos.indexOf(clickedPhoto);
    this.setState({ activeIndex: clicked });
  }

  // ADD PROPS (currentStylePhotos) TO STATE ON UPDATE
  componentDidUpdate(prevProps) {
    if (this.props.currentStylePhotos !== prevProps.currentStylePhotos) {
      this.setState({
        photos: this.props.currentStylePhotos,
        length: this.props.currentStylePhotos.length,
        activeIndex: 0
      });
    }
  }

  render() {
    var photos = this.props.currentStylePhotos;
    return (
      <div className="image-gallery">
        <div className="image-area">
          <div className="left-arrow">
            {this.state.activeIndex === 0 ? (
              ""
            ) : (
              <LeftArrow goToPrevSlide={this.goToPrevSlide} />
            )}
          </div>

          <div className="main-image">
            {
              <img
                className="main-image"
                src={photos ? photos[this.state.activeIndex].url : ""}
              />
            }
          </div>

          <div>
            {this.state.activeIndex === this.state.length - 1 ? (
              ""
            ) : (
              <RightArrow goToNextSlide={this.goToNextSlide} />
            )}
          </div>
        </div>
        <div className="thumbnails">
          {photos
            ? photos.map((eachPhoto, key) => {
                return (
                  <img
                    className="thumbnail"
                    src={eachPhoto.thumbnail_url}
                    key={key}
                    onClick={() => {
                      this.enlargeThumbnail(eachPhoto);
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

export default ImageGallery;
