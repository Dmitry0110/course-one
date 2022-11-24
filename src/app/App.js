import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./navBar/main";
import Login from "./navBar/login";
import Users from "./navBar/users";
import Edit from "./navBar/edit";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?/edit" render={() => <Edit />} />
                <Route path="/users/:userId?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={Main} />
            </Switch>
        </>
    );
}

export default App;
