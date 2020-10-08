import React, { Component } from "react";

class FooterComponent extends Component {
    render() {
        return (
            <>
                <hr />
                <footer className="footer">
                    <span className="text-muted">Version 0.1.1 | Codename: Trisolaris</span>
                </footer>
            </>
        )
    }
}

export default FooterComponent;