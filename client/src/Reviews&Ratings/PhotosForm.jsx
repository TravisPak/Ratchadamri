import React from "react";

class PhotosForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { image: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // setPhotos in here
    this.props.addPhoto(this.state.image);
    this.props.handleClose();
  }

  render() {
    return (
      <form className="photo-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.image}
          name="image"
          onChange={this.handleChange}
        ></input>
        <input type="submit" value="Upload" />
      </form>
    );
  }
}

export default PhotosForm;
