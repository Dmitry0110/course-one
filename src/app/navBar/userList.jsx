import React from "react";
import { useParams } from "react-router-dom";
import Users from "../components/users";
import User from "./user";
import PropTypes from "prop-types";

const UserList = ({ history }) => {
    const { userId } = useParams();

    return userId ? <User id={userId} history={history} /> : <Users />;
};

UserList.propTypes = {
    history: PropTypes.func
};

export default UserList;
