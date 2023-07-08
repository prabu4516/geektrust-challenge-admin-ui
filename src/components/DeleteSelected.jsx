import React from "react";

const DeleteSelected = ({ handleAllDelete }) => {
  return (
    <button className="deleteall" 
    type="button" 
    onClick={handleAllDelete}>
      Delete Selected
    </button>
  );
};

export default DeleteSelected;