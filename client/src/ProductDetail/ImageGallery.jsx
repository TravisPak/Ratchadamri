import React from "react";
import axios from "axios";
import { LeftArrow, RightArrow, UpArrow, DownArrow } from "./Carousel.jsx";

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      length: 0,
      activeIndex: 0,
      lowerThumbnailIndex: 0,
      upperThumbnailIndex: 7,
      length: 0,
    };
    this.goUp = this.goUp.bind(this);
    this.goDown = this.goDown.bind(this);
    this.englargeThumbnail = this.enlargeThumbnail.bind(this);
    this.createThumbnails = this.createThumbnails.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
  }

  goUp() {
    var lower = this.state.lowerThumbnailIndex;
    var upper = this.state.upperThumbnailIndex;
    var index = this.state.activeIndex;
    if (lower > 0) {
      lower--;
      upper--;
      this.setState({ lowerThumbnailIndex: lower, upperThumbnailIndex: upper });
    }
  }
  goDown() {
    var lower = this.state.lowerThumbnailIndex;
    var upper = this.state.upperThumbnailIndex;
    var index = this.state.activeIndex;

    if (upper < this.state.photos.length) {
      lower++;
      upper++;
      this.setState({ lowerThumbnailIndex: lower, upperThumbnailIndex: upper });
    }
  }

  goToPrevSlide() {
    var lower = this.state.lowerThumbnailIndex;
    var upper = this.state.upperThumbnailIndex;
    var index = this.state.activeIndex;
    var length = this.state.length;
    if (index < 1) {
      index = length - 1;
    } else {
      index--;
    }

    if (index <= lower && index >= 1) {
      lower--;
      upper--;
      this.setState({ lowerThumbnailIndex: lower, upperThumbnailIndex: upper });
    }
    this.setState({ activeIndex: index });
  }

  goToNextSlide() {
    var lower = this.state.lowerThumbnailIndex;
    var upper = this.state.upperThumbnailIndex;
    var index = this.state.activeIndex;
    var length = this.state.length;
    if (index === length - 1) {
      index = 0;
    } else {
      index++;
    }

    if (index >= upper - 1) {
      lower++;
      upper++;
      this.setState({ lowerThumbnailIndex: lower, upperThumbnailIndex: upper });
    }
    this.setState({ activeIndex: index });
  }

  createThumbnails(photos) {
    var thumbnails = photos.map((eachPhoto, key) => {
      return (
        <img
          className={key === this.state.activeIndex ? "thumbnail clicked" : "thumbnail"}
          src={eachPhoto.thumbnail_url}
          key={key}
          onClick={() => {
            this.enlargeThumbnail(eachPhoto);
          }}
        />
      );
    });

    return thumbnails.slice(this.state.lowerThumbnailIndex, this.state.upperThumbnailIndex);
  }

  // ENLARGE THUMBNAIL PHOTO ON CLICK
  enlargeThumbnail(clickedPhoto) {
    console.log(clickedPhoto);
    var clicked = this.state.photos.indexOf(clickedPhoto);
    this.setState({ activeIndex: clicked });
  }

  // ADD PROPS (currentStylePhotos) TO STATE ON UPDATE
  componentDidUpdate(prevProps) {
    if (this.props.currentStylePhotos !== prevProps.currentStylePhotos) {
      this.setState({
        photos: this.props.currentStylePhotos,
        length: this.props.currentStylePhotos.length,
      });
    }
  }

  render() {
    var photos = this.props.currentStylePhotos;
    return (
      <div className="image-gallery">
        <div className="image-area">
          <div className={this.state.activeIndex === 0 ? "left-arrow hidden" : "left-arrow"}>
            {this.state.activeIndex === 0 ? <LeftArrow /> : <LeftArrow goToPrevSlide={this.goToPrevSlide} />}
          </div>

          <div className="main-image">{<img className="main-image" src={photos ? photos[this.state.activeIndex].url : ""} />}</div>

          <div className={this.state.activeIndex === this.state.length - 1 ? "right-arrow hidden" : "right-arrow"}>
            {this.state.activeIndex === this.state.length - 1 ? "" : <RightArrow goToNextSlide={this.goToNextSlide} />}
          </div>
        </div>

        <div className="thumbnails">
          <div className={this.state.lowerThumbnailIndex > 0 ? "up-arrow" : "up-arrow hidden"}>
            <UpArrow goUp={this.goUp} />
          </div>

          <div>{photos ? this.createThumbnails(photos) : ""}</div>

          <div className={this.state.upperThumbnailIndex < this.state.length ? "down-arrow" : "down-arrow hidden"}>
            <DownArrow goDown={this.goDown} />
          </div>
        </div>
      </div>
    );
  }
}

export default ImageGallery;
