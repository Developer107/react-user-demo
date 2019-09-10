import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Users from "./pages/Users";


class Routes extends React.PureComponent {
    render() {
        return (
            <div>
                <Router>
                    <Route path="/home" component={Home}/>
                    <Route path="/profile/:id" component={Profile}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/" exact component={Login}/>
                </Router>
            </div>
        );
    }
}

export default Routes;