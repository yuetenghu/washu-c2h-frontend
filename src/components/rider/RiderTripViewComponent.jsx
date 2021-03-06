import React, { Component } from "react";
import DataService from "../../api/DataService";
import TripDetailComponent from "../TripDetailComponent";

class DriverTripViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tripId: this.props.match.params.tripId,
            tripDetails: {
                // startTime: new Date(Date.now()),
                // passCode: "OLD789",
                // totalAddrs: 5,
                // arrivedAddrs: 1,
                // isRouteUpToDate: false,
                // route: [
                //     { id: 9, lat: 42.447339, lng: -76.470859, addr: "411 Tower Rd", hasArrived: true },
                //     { id: 10, lat: 42.456832, lng: -76.471961, addr: "121 Pleasant Grove Rd", hasArrived: false },
                //     { id: 11, lat: 42.477718, lng: -76.467641, addr: "600 Warren Rd", hasArrived: false }
                // ]
            }
        }
        this.refreshTripDetails = this.refreshTripDetails.bind(this);
    }

    componentDidMount() {
        this.refreshTripDetails();
    }

    refreshTripDetails() {
        DataService.getTripDetails(this.state.tripId)
            .then(response => {
                this.setState({
                    tripDetails: response.data
                })
            })
            .catch(e => console.log(e));
    }

    render() {
        console.log(this.state.tripDetails);
        if (this.state.tripDetails.isRouteUpToDate) {
            this.state.tripDetails.route.sort(
                (a, b) => a.seqId - b.seqId
            );
        }
        return (
            <>
                {Object.keys(this.state.tripDetails).length > 0 && <TripDetailComponent {...this.state} />}
                <div className="alert alert-primary" role="alert">Please keep this tab open until your arrival</div>
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            {this.state.tripDetails.isRouteUpToDate && <th>Seq</th>}
                                {!this.state.tripDetails.isRouteUpToDate && <th>No</th>}
                                <th>Address</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {Object.keys(this.state.tripDetails).length > 0 && <tbody>
                            {this.state.tripDetails.route.map(
                                (addr) =>
                                    <tr key={addr.id} className={(addr.hasArrived) ? "table-success" : ""}>
                                        {this.state.tripDetails.isRouteUpToDate && <td>{addr.seqId}</td>}
                                        {!this.state.tripDetails.isRouteUpToDate && <td>{this.state.tripDetails.route.indexOf(addr) + 1}</td>}
                                        <td>{(addr.id === parseInt(sessionStorage.getItem("addrId"))) ? <button className="btn btn-outline-info btn-sm">You</button> : ""}<a target="_blank" rel="noopener noreferrer" href={`https://maps.google.com/?q=${addr.addr}`}>{addr.addr}</a></td>
                                        <td>{(addr.hasArrived) ? "Arrived" : "En-route"}</td>
                                    </tr>
                            )}
                        </tbody>}
                    </table>
                </div>
                <a href="/rider/trip" className="m-2 btn btn btn-secondary">⇦ Back to list</a>
                <button className="m-1 btn btn btn-success" onClick={this.refreshTripDetails}>Refresh</button>
                <button className="m-1 btn btn btn-info">Send feedback</button>
            </>
        )
    }
}

export default DriverTripViewComponent;