import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, ...rest }) => {
    return (
        <button className="btn btn-secondary btn-sm m-2" {...rest}>
            <i className={`bi bi-bookmark${status ? "-fill" : ""}`}></i>
        </button>
    );
};

Bookmark.propTypes = {
    status: PropTypes.string.isRequired
};

export default Bookmark;
