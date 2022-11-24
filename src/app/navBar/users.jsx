import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import UserPage from "../components/page/userPage";
import UsersListPade from "../components/page/usersListPage";

const Users = () => {
    const { userId } = useParams();
    return userId ? <UserPage id={userId} /> : <UsersListPade />;
};

Users.propTypes = {
    history: PropTypes.object
};

export default Users;
