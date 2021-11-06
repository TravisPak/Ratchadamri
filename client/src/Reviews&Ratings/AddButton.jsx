import React from "react";

const AddButton = (props) => {
  const handleClick = () => {
    console.log("Add a review");
    props.showModal();
  };

  return <button className="add-button"onClick={handleClick}>Add A Review +</button>;
};

export default AddButton;
