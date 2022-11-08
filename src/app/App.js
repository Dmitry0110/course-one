import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./navBar/main";
import Login from "./navBar/login";
import UserList from "./navBar/userList";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?" component={UserList} />
                <Route path="/login" component={Login} />
                <Route path="/" exact component={Main} />
            </Switch>
        </>
    );
}

export default App;
