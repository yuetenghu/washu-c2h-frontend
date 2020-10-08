import React, { Component } from "react";

class HomeComponent extends Component {
    render() {
        return (
            <>
                <img src="/apple-touch-icon.png" alt="c2h" height="100" width="100"/>

                <hr />

                <h4>c2h service</h4>

                <a href="/rider/trip" className="btn btn-success">I'm a <b>Rider</b></a>

                <br /><br />

                <a href="/driver/login" className="btn btn-info">I'm a <b>Driver</b></a>
                
                <hr />

                <h4>More of c2h</h4>
                
                <a target="_blank" href="https://parking.wustl.edu/items/campus2home/" className="btn btn-info" rel="noopener noreferrer">c2h website</a>


            </>
        )
    }
}


export default HomeComponent;