import React, { Component } from "react";
import TripDetailComponent from "../TripDetailComponent";

class DriverTripViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <TripDetailComponent />
                [Table for driver view; View and Edit]
                [Refer to code in Vue]
                <button className="m-2 btn btn btn-secondary">⇦ Back to Trip List</button>
                <button className="m-2 btn btn btn-success">Refresh</button>
                <button className="m-2 btn btn btn-warning">Finish Trip</button>
            </>
        )
    }
}

export default DriverTripViewComponent;