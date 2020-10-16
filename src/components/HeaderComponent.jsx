import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom"
import AuthService from "../api/AuthService";

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthService.isUserLoggedIn();
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href="localhost:4200" className="navbar-brand">c2h</a>
                    </div>
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/">Home</Link></li>
                    </ul>
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/about">About/Feedback</Link></li>
                    </ul>
                    {isUserLoggedIn && <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/log-out" onClick={AuthService.logOut}>Log out</Link></li>
                    </ul>}
                </nav>
            </header>
        )
    }
}


export default withRouter(HeaderComponent);