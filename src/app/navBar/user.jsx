import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import Quality from "../components/qualitie";

const User = ({ id, history }) => {
    const [user, setUser] = useState();
    const handleAllUsers = () => {
        history.push("/users");
    };
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <>
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
                    onClick={() => {
                        handleAllUsers();
                    }}
                >
                    Все пользователи
                </button>
            </>
        );
    }
    return <h3>Loading...</h3>;
};

User.propTypes = {
    id: PropTypes.string,
    history: PropTypes.object
};

export default User;
