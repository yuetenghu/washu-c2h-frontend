import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { GOOGLE_MAPS_API_KEY } from "../config/secret";
import MapMarkerComponent from "./map_marker/MapMarkerComponent";
import TimeUtils from "../utils/TimeUtils";

class TripDetailComponent extends Component {
    // constructor(props) {
    //     super(props);
    // }

    static defaultProps = {
        center: {
            lat: 42.447558,
            lng: -76.482747
        },
        zoom: 12
    };

    render() {
        return (
            <>
                <h4>Start time: {TimeUtils.toDisplayString(this.props.tripDetails.startTime)}</h4>
                <h4>Passcode: <code>{this.props.tripDetails.passcode}</code></h4>
                <h5>Total: {this.props.tripDetails.route.length}, Arrived: {this.props.tripDetails.route.filter(addr => addr.arrivalTime !== null).length}</h5>
                {!this.props.tripDetails.isRouteUpToDate && <div class="alert alert-warning" role="alert">Still calculating route. Please use the bottom "Refresh" button to refresh.</div>}
                {/* Important! Always set the container height explicitly */}
                <div style={{ height: '50vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        {this.props.tripDetails.route.map(
                            (addr) => <MapMarkerComponent key={addr.id} lat={addr.lat} lng={addr.lng} text={this.props.tripDetails.route.indexOf(addr) + 1} />
                        )}
                    </GoogleMapReact>
                </div>
            </>
        );
    }
}

export default TripDetailComponent;