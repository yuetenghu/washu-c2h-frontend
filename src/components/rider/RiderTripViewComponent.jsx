import React, { Component } from "react";
import TripDetailComponent from "../TripDetailComponent";

class DriverTripViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tripDetails: {
                startTime: new Date(Date.now()),
                passCode: "OLD789",
                totalAddrs: 5,
                arrivedAddrs: 1,
                isRouteUpToDate: false,
                route: [
                    { id: 9, lat: 42.447339, lng: -76.470859, addr: "411 Tower Rd", hasArrived: true },
                    { id: 10, lat: 42.456832, lng: -76.471961, addr: "121 Pleasant Grove Rd", hasArrived: false },
                    { id: 11, lat: 42.477718, lng: -76.467641, addr: "600 Warren Rd", hasArrived: false }
                ]
            }
        }
    }

    render() {
        return (
            <>
                <TripDetailComponent {...this.state} />
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Address</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tripDetails.route.map(
                                    (addr) =>
                                        <tr key={addr.id} className={(addr.hasArrived) ? "table-success" : ""}>
                                            <td>{addr.id}</td>
                                            <td>{addr.addr}</td>
                                            <td>{addr.hasArrived ? "Arrived" : "En-route"}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <button className="m-1 btn btn btn-secondary">⇦ Back to list</button>
                <button className="m-1 btn btn btn-success">Refresh</button>
                <button className="m-1 btn btn btn-info">Send feedback</button>
            </>
        )
    }
}

export default DriverTripViewComponent;