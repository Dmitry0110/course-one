import React from "react";
import Quality from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onToggleBoockmark,
    onHandleDelete,
    bookmark
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} /5</td>
            <td>
                {
                    <Bookmark
                        status={bookmark}
                        onClick={() => onToggleBoockmark(_id)}
                    />
                }
            </td>
            <td>
                <button
                    onClick={() => onHandleDelete(_id)}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onToggleBoockmark: PropTypes.func.isRequired,
    onHandleDelete: PropTypes.func.isRequired,
    bookmark: PropTypes.bool.isRequired
};

export default User;
