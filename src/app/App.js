import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const toggleBoockmark = (id) => {
        const newUsers = users.map((user) => {
            if (user._id === id) {
                return {
                    ...user,
                    bookmark: !user.bookmark
                };
            }
            return user;
        });
        setUsers(newUsers);
    };

    return (
        <>
            {users && (
                <Users
                    users={users}
                    onToggleBoockmark={toggleBoockmark}
                    onHandleDelete={handleDelete}
                />
            )}
        </>
    );
}

export default App;
