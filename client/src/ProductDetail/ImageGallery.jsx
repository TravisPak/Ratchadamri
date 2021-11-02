import React from "react";
import axios from "axios";

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      currentPhotoURL: ""
    };
    // this.getPhotos = this.getPhotos.bind(this);
    this.englargeThumbnail = this.enlargeThumbnail.bind(this);
  }

  // ENLARGE THUMBNAIL PHOTO ON CLICK
  enlargeThumbnail(clickedPhoto) {
    this.setState({currentPhotoURL: clickedPhoto.url})
  }

  // ADD PROPS (currentStylePhotos) TO STATE ON UPDATE
  componentDidUpdate(prevProps) {
    if (this.props.currentStylePhotos !== prevProps.currentStylePhotos) {
      this.setState({photos: this.props.currentStylePhotos, currentPhotoURL: this.props.currentStylePhotos[0].url})
    }
  }

  render() {
    return (
      <div className="image-gallery">
        <img className="main-image" src={this.state.currentPhotoURL}/>
        {this.props.currentStylePhotos ? this.props.currentStylePhotos.map((eachPhoto, key) => {
          return <img className="thumbnails" src={eachPhoto.thumbnail_url} key={key} onClick={() => {this.enlargeThumbnail(eachPhoto)}}/>
        }) : ""}

      </div>
    );
  }
}

export default ImageGallery;


