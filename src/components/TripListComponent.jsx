import React, { Component } from "react";

class TripListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tripList: [
                { id: 1, startTime: new Date(), finishTime: new Date() },
                { id: 2, startTime: new Date(), finishTime: new Date() },
                { id: 5, startTime: new Date(), finishTime: new Date() }
            ]
        }
    }

    render() {
        return (
            <>
                <h4>Hi, [givenName]</h4>
                <p>This is common component for both driver and rider. Must act according to their credential: JWT</p>

                <hr />

                <h4>Current trip (0 or 1)</h4>
                [Display current trip here]
                <p>Please continue and finish the current trip, before creating a new trip.</p>

                <hr />

                <h4>Create a new trip</h4>
                [Only display if there is no current trip] <br/>
                [For driver: Create trip; For rider: Verify trip] <br/>
                <a href="/driver/create-trip" className="btn btn-success">Create</a>
                <a href="/rider/verify-trip" className="btn btn-success">Create</a>

                <hr />

                <h4>Finished trips (counter)</h4>
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
                                this.state.tripList.map(
                                    (trip) =>
                                        <tr key={trip.id}>
                                            <td>{trip.id}</td>
                                            <td>{new Intl.DateTimeFormat("en-US").format(trip.startTime)}</td>
                                            <td>{new Intl.DateTimeFormat("en-US").format(trip.finishTime)}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>

            </>
        )
    }
}

export default TripListComponent;