import React from "react";

const MoreButton = (props) => {
  const handleClick = () => {
    // console.log("render more reviews");

    let index = props.displayList.length;
    props.addMore(props.reviews[index], props.reviews[index + 1]);
  };

  return (
    <button className="more-button" onClick={handleClick}>
      More Reviews
    </button>
  );
};

export default MoreButton;
