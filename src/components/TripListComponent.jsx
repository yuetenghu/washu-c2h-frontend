import React, { Component } from "react";
import { ROLE } from "../config/config";

class TripListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tripList: [
                { id: 1, startTime: new Date(), finishTime: new Date() },
                { id: 2, startTime: new Date(), finishTime: new Date() },
                // { id: 5, startTime: new Date(), finishTime: null }
            ]
        }
    }

    render() {
        let currentTripList = this.state.tripList.filter(e => e.finishTime === null);
        let finishedTripList = this.state.tripList.filter(e => e.finishTime !== null);
        return (
            <>
                {sessionStorage.getItem("givenName") && <h4>Hi, {sessionStorage.getItem("givenName")}</h4>}
                {!sessionStorage.getItem("givenName") && <h4>Hi, stranger</h4>}

                <hr />

                <h4>Current trip ({currentTripList.length})</h4>
                {currentTripList.length >= 1 && <>
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Trip ID</th>
                                    <th>Start Time</th>
                                    <th>Finish Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentTripList.map(
                                        (trip) =>
                                            <tr key={trip.id}>
                                                <td>{trip.id}</td>
                                                <td>{new Intl.DateTimeFormat("en-US").format(trip.startTime)}</td>
                                                <td>Not finished</td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <p>Please continue and finish the current trip, before creating a new trip.</p>
                    <a href="/rider/continue" className="btn btn-info">Continue</a>
                </>}
                {currentTripList.length === 0 && <p>There's no current trip. Create one below.</p>}

                {currentTripList.length === 0 && <>
                    <hr />
                    <h4>Create a new trip</h4>
                    {sessionStorage.getItem("role") === ROLE.DRIVER && <a href="/driver/create-trip" className="btn btn-success">Create</a>}
                    {(!sessionStorage.getItem("role") || sessionStorage.getItem("role") !== ROLE.DRIVER) && <a href="/rider/verify-trip" className="btn btn-success">Create</a>}
                </>}

                <hr />

                <h4>Finished trips ({finishedTripList.length})</h4>
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Trip ID</th>
                                <th>Start Time</th>
                                <th>Finish Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finishedTripList.map(
                                (trip) =>
                                    <tr key={trip.id}>
                                        <td>{trip.id}</td>
                                        <td>{new Intl.DateTimeFormat("en-US").format(trip.startTime)}</td>
                                        <td>{new Intl.DateTimeFormat("en-US").format(trip.finishTime)}</td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </>
        )
    }
}

export default TripListComponent;