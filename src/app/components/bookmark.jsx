import React from "react";

const Bookmark = ({ status, ...rest }) => {
  return (
    <button className="btn btn-secondary btn-sm m-2" {...rest}>
      <i className={`bi bi-bookmark${status ? "-fill" : ""}`}></i>
    </button>
  );
};

export default Bookmark;
