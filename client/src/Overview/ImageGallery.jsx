import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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
      expanded: false,
      zoomed: false,
    };

    this.englargeThumbnail = this.enlargeThumbnail.bind(this);
    this.createThumbnails = this.createThumbnails.bind(this);
    this.expand = this.expand.bind(this);
    this.zoom = this.zoom.bind(this);
    this.followMouseZoom = this.followMouseZoom.bind(this);
    this.goUp = this.goUp.bind(this);
    this.goDown = this.goDown.bind(this);
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
          className={(key === this.state.activeIndex ? "thumbnail clicked" : "thumbnail") + " " + (this.state.expanded ? "expanded" : "")}
          src={eachPhoto.thumbnail_url}
          key={key}
          onClick={() => {
            this.enlargeThumbnail(eachPhoto);
          }}
        />
      );
    });
    if (!this.state.expanded) {
      return thumbnails.slice(this.state.lowerThumbnailIndex, this.state.upperThumbnailIndex);
    } else {
      return thumbnails;
    }
  }

  // ENLARGE THUMBNAIL PHOTO ON CLICK
  enlargeThumbnail(clickedPhoto) {
    var clicked = this.state.photos.indexOf(clickedPhoto);
    this.setState({ activeIndex: clicked });
  }

  expand() {
    this.setState(this.state.expanded ? { expanded: false } : { expanded: true });
  }

  zoom() {
    this.setState(this.state.zoomed ? { zoomed: false } : { zoomed: true });
  }

  followMouseZoom(event, mouseX, mouseY) {
    // console.log(mouseX, mouseY);
    var imageBounds = event.target.getBoundingClientRect();
    var imageSizeX = imageBounds.right - imageBounds.left;
    var imageSizeY = imageBounds.bottom - imageBounds.top;
    // var xPos = (imageBounds.x - mouseX) * 2.5;
    // var yPos = (imageBounds.y - mouseY) * 2.5;
    // var xPos = (imageBounds.right - mouseX) - (imageSizeX * (2.5/2));
    // var yPos = (imageBounds.bottom - mouseY) - (imageSizeY * (2.5/2));
    var xPos = -5 * (mouseX - imageBounds.left - 50);
    var yPos = -5 * (mouseY - imageBounds.top - 50);

    this.setState({xPos, yPos});

  }

  zoomStyle() {
    return {left: this.state.xPos, top: this.state.yPos }
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
    var moveZoom = '{transition: translate(this.state.xPos, this.state.yPos) }'
    return (
      <div className={this.state.expanded ? "image-gallery expanded" : "image-gallery"}>
        <div className={this.state.expanded ? "image-area expanded" : "image-area"}>
          {/* LEFT ARROW */}
          <div className={this.state.activeIndex === 0 ? "left-arrow hidden" : "left-arrow"}>
            {this.state.activeIndex === 0 ? <LeftArrow /> : <LeftArrow goToPrevSlide={this.goToPrevSlide} />}
          </div>

          {/* MAIN IMAGE HANDLING */}
          {
            <img
              onClick={() => {
                if (!this.state.expanded) {
                  this.expand();
                } else {
                  this.zoom();
                }
              }}
              // onMouseMove
              onMouseMove={() => {
                if (this.state.zoomed) {
                  this.followMouseZoom(event, event.clientX, event.clientY);
                }
              }}
              className={(this.state.expanded ? "main-image expanded" : "main-image") + (this.state.zoomed ? " zoomed" : "")}
              src={photos ? photos[this.state.activeIndex].url : ""}
            />
          }

          {
            <img
              className={this.state.zoomed ? "zoom-image" : "not-zoomed"}
              src={photos ? photos[this.state.activeIndex].url : ""}
              onClick={() => {
                this.setState({ zoomed: false });
                console.log(event.target.getBoundingClientRect())
              }}
              style={{left: this.state.xPos, top: this.state.yPos }}
            />
          }

          {/* RIGHT ARROW */}
          <div className={this.state.activeIndex === this.state.length - 1 ? "right-arrow hidden" : "right-arrow"}>
            {this.state.activeIndex === this.state.length - 1 ? "" : <RightArrow goToNextSlide={this.goToNextSlide} />}
          </div>
        </div>

        {/* X FOR LEAVE EXPANDED VIEW */}

        <FontAwesomeIcon
          className={this.state.expanded ? "xOut expanded" : "xOut"}
          icon={faTimes}
          size="2x"
          onClick={() => {
            this.expand();
            this.setState({ expanded: false, zoomed: false });
          }}
        />

        {/* THUMBNAILS SECTION */}
        <div className={this.state.expanded ? "thumbnails expanded" : "thumbnails"}>
          <div className={(this.state.lowerThumbnailIndex > 0 ? "up-arrow" : "up-arrow hidden") + (this.state.expanded ? " expanded" : "")}>
            <UpArrow goUp={this.goUp} />
          </div>

          <div>{photos ? this.createThumbnails(photos) : ""}</div>

          <div
            className={
              (this.state.upperThumbnailIndex < this.state.length ? "down-arrow" : "down-arrow hidden") + (this.state.expanded ? " expanded" : "")
            }
          >
            <DownArrow goDown={this.goDown} />
          </div>
        </div>
      </div>
    );
  }
}

export default ImageGallery;
