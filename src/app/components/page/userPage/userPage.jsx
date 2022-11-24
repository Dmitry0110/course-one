import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Quality from "../../ui/qualities/qualitie";

const UserPage = ({ id }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const handleAllUsers = () => {
        history.push(`/users/${user._id}/edit`);
    };
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <div className="container px-1 m-4">
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>

                <h6 key={user._id}>
                    {user.qualities.map((qual) => (
                        <Quality key={qual._id} {...qual} />
                    ))}
                </h6>
                <h6>completedMeetings: {user.completedMeetings}</h6>
                <h2>Rate: {user.rate}</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        handleAllUsers();
                    }}
                >
                    Изменить
                </button>
            </div>
        );
    }
    return <h3>Loading...</h3>;
};

UserPage.propTypes = {
    id: PropTypes.string,
    history: PropTypes.object
};

export default UserPage;
