import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronCircleRight, faChevronCircleLeft} from "@fortawesome/free-solid-svg-icons";


const LeftArrow = (props) => {
  return (
    <div className="back-arrow" onClick={props.goToPrevSlide}>
      <FontAwesomeIcon icon={faChevronCircleLeft} />
    </div>
  )
}

const RightArrow = (props) => {
  return (
    <div className="next-arrow" onClick={props.goToNextSlide}>
      <FontAwesomeIcon icon={faChevronCircleRight} />
    </div>
  )
}

export {
  LeftArrow,
  RightArrow,
}

