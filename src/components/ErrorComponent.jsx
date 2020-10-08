import React from "react";

function ErrorComponent() {
    return (
        <>
            <h4>Page not found</h4>
            <p>Perhaps you've arrived at a wrong URL.</p>
            <a href="/" className="btn btn-success">Go to Home page</a>
        </>

    )
}

export default ErrorComponent;