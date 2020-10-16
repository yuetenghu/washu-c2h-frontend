import React, { Component } from "react";

class LogOutComponent extends Component {
    render() {
        return (
            <>
                <h4>You've logged out.</h4>
                <hr />
                <a href="/" className="btn btn-success">Go to homepage</a>
            </>
        );
    }
}

export default LogOutComponent;