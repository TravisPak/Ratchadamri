import React from "react";
import axios from "axios";
// import Card from "./Carousel.jsx"
import { LeftArrow, RightArrow } from "./Carousel.jsx";
// import {useState} from "react";
// import {FontAwesomeIcon} from "@fortawesome/reactfontawesome";
// import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons"
// const [index, setIndex] = useState(0);

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      currentPhotoURL: "",
      activeIndex: 0,
      length: 0,
    };
    // this.getPhotos = this.getPhotos.bind(this);
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
    console.log(this.state.photos.indexOf(clickedPhoto));
    var clicked = this.state.photos.indexOf(clickedPhoto);
    this.setState({ activeIndex: clicked });
  }

  // ADD PROPS (currentStylePhotos) TO STATE ON UPDATE
  componentDidUpdate(prevProps) {
    if (this.props.currentStylePhotos !== prevProps.currentStylePhotos) {
      this.setState({
        photos: this.props.currentStylePhotos,
        currentPhotoURL:
          this.props.currentStylePhotos[this.state.activeIndex].url,
        length: this.props.currentStylePhotos.length,
      });
    }
    // console.log(this.state.activeIndex, this.state.currentPhotoURL);
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
