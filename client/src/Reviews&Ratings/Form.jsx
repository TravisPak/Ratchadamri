import React from "react";
import StarRatings from "./StarRatings.jsx";
import PhotosForm from "./PhotosForm.jsx";
import Modal from "./Modal.jsx";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overallRating: "",
      recommend: "true",
      characteristics: {},
      summary: "",
      body: "",
      photos: [],
      nickname: "",
      email: "",
      selections: {},
      modalShowing: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCharacteristicChange =
      this.handleCharacteristicChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.setRating = this.setRating.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
    this.validateImage = this.validateImage.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {}

  validateForm() {

    //mandatory fields blank
    if (
      this.state.overallRating === "" ||
      this.state.recommend === "" ||
      this.state.characteristics === {} ||
      this.state.body === "" ||
      this.state.nickname === "" ||
      this.state.email === ""
    ) {
      console.log(
        "Mandatory field blank. Please make sure to fill in all fields with **"
      );
      return false;
    }
    //body
    if (this.state.body.length < 50) {
      console.log("Review body less than 50 characters. Please tell us more!");
      return false;
    }
    //email right format
    let regex = /\S+@\S+\.\S+/;
    if (!regex.test(this.state.email)) {
      console.log("Please enter a valid email");
      return false;
    }
    //photos check
    for (let photo of this.state.photos) {
      if (!this.validateImage(photo)) {
        console.log("One of your photos could not be uploaded");
        return false;
      }
    }
    return true;
  }

  validateImage(url) {
    let img = new Image();
    img.src = url;
    return img.height != 0;
  }

  showModal() {
    this.setState({ modalShowing: true });
  }

  hideModal() {
    this.setState({ modalShowing: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log("validated or not:", this.validateForm());
    if (this.validateForm()) {
      // console.log("we are validated");
      axios
        .post("/reviews", {
          product_id: parseInt(this.props.productId),
          rating: this.state.overallRating,
          summary: this.state.summary,
          body: this.state.body,
          recommend: Boolean(this.state.recommend),
          name: this.state.nickname,
          email: this.state.email,
          photos: this.state.photos,
          characteristics: this.state.characteristics,
        })
        .then((data) => {
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCharacteristicChange(event) {
    let id = this.props.characteristics[event.target.name].id;
    let characteristic = event.target.name;
    let selection = event.target.value;
    let description = "";

    let characteristicSelections = {
      Size: [
        "A size too small",
        "1/2 a size too small",
        "Perfect",
        "1/2 a size too big",
        "A size too wide",
      ],
      Width: [
        "Too narrow",
        "Slighty narrow",
        "Perfect",
        "Slighthy wide",
        "Too wide",
      ],
      Comfort: [
        "Uncomfortable",
        "Slightly uncomfortable",
        "Ok",
        "Comfortable",
        "Perfect",
      ],
      Quality: [
        "Poor",
        "Below average",
        "What I expected",
        "Pretty great",
        "Perfect",
      ],
      Length: [
        "Runs Short",
        "Runs slighty short",
        "Perfect",
        "Runs slightly long",
        "Runs long",
      ],
      Fit: [
        "Runs tight",
        "Runs slightly tight",
        "Perfect",
        "Runs slightly long",
        "Runs long",
      ],
    };
    if (characteristicSelections[characteristic]) {
      if (selection === "1") {
        description = characteristicSelections[characteristic][0];
      } else if (selection === "2") {
        description = characteristicSelections[characteristic][1];
      } else if (selection === "3") {
        description = characteristicSelections[characteristic][2];
      } else if (selection === "4") {
        description = characteristicSelections[characteristic][3];
      } else if (selection === "5") {
        description = characteristicSelections[characteristic][4];
      }
    }

    this.setState((prevState) => ({
      selections: {
        ...prevState.selections,
        [characteristic]: description,
      },
      characteristics: {
        ...prevState.characteristics,
        [id.toString()]: parseInt(event.target.value),
      },
    }));
  }



  addPhoto(image) {
    // console.log(`I am adding this photo: ${image}`);
    let photos = [...this.state.photos];
    if (photos.length < 5) {
      photos.push(image);
      this.setState({ photos: photos });
    } else {
      // console.log("Reached photo upload limit");
    }
  }

  setRating(index) {
    this.setState({ overallRating: index });
  }

  render() {
    if (!this.state || !this.props.characteristics) {
      return null;
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Write your Review</h1>
          <label>
            *Overall Rating*
            <StarRatings setRating={this.setRating} />
          </label>
          <br></br>
          <label>
            *Do you recommend this product*
            <label>
              Yes:
              <input
                type="radio"
                value="true"
                name="recommend"
                defaultChecked="checked"
                onChange={this.handleChange}
              ></input>
            </label>
            <label>
              No:
              <input
                type="radio"
                value="false"
                name="recommend"
                onChange={this.handleChange}
              ></input>
            </label>
          </label>
          <br></br>
          <label>
            *Characteristics*
            {Object.keys(this.props.characteristics).map(
              (characteristic, id) => {
                return (
                  <div key={id}>
                    <label>
                      {characteristic}
                      <label>
                        <input
                          type="radio"
                          value="1"
                          name={characteristic}
                          onChange={this.handleCharacteristicChange}
                        ></input>
                        <input
                          type="radio"
                          value="2"
                          name={characteristic}
                          onChange={this.handleCharacteristicChange}
                        ></input>
                        <input
                          type="radio"
                          value="3"
                          name={characteristic}
                          onChange={this.handleCharacteristicChange}
                        ></input>
                        <input
                          type="radio"
                          value="4"
                          name={characteristic}
                          onChange={this.handleCharacteristicChange}
                        ></input>
                        <input
                          type="radio"
                          value="5"
                          name={characteristic}
                          onChange={this.handleCharacteristicChange}
                        ></input>
                        {this.state.selections[characteristic]}
                      </label>
                    </label>
                  </div>
                );
              }
            )}
          </label>
          <br></br>
          <label>
            Summary
            <textarea
              type="text"
              value={this.state.summary}
              name="summary"
              placeholder="Best purchase ever!"
              onChange={this.handleChange}
            ></textarea>
          </label>
          <br></br>
          <label>
            *Body*
            <textarea
              type="text"
              value={this.state.body}
              name="body"
              placeholder="Why did you like the product or not?"
              onChange={this.handleChange}
            ></textarea>
          </label>
          <br></br>
          <label>
            *Nickname*
            <input
              type="text"
              value={this.state.nickname}
              name="nickname"
              placeholder="jackson11!"
              onChange={this.handleChange}
            ></input>
          </label>
          <br></br>
          <label>
            *Email*
            <input
              type="text"
              value={this.state.email}
              name="email"
              placeholder="jackson11@gmail.com"
              onChange={this.handleChange}
            ></input>
          </label>
          <br></br>
          <i>For authentication reasons, you will not be emailed</i>
          <button type="button" onClick={this.showModal}>
            Upload Photos
          </button>
          {this.state.photos.map((photo, id) => {
            return <img key={id} src={photo} width="50"></img>;
          })}
          <button type="submit">Submit</button>
        </form>
        <Modal isShowing={this.state.modalShowing} handleClose={this.hideModal}>
          <PhotosForm addPhoto={this.addPhoto} />
        </Modal>
      </div>
    );
  }
}

export default Form;
