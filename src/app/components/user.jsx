import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onToggleBoockmark,
  onHandleDelete,
  bookmark,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((item) => (
          <Qualitie {...item} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        {<Bookmark status={bookmark} onClick={() => onToggleBoockmark(_id)} />}
      </td>
      <td>
        <button onClick={() => onHandleDelete(_id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
