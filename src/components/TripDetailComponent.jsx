import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { GOOGLE_MAPS_API_KEY } from "../config/secret";
import MapMarkerComponent from "./map_marker/MapMarkerComponent";

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
                <h4>Start time: {this.props.tripDetails.startTime.toISOString()}</h4>
                {this.props.tripDetails.passCode && <h4>Passcode: <code>{this.props.tripDetails.passCode}</code></h4>}
                <h5>Total: {this.props.tripDetails.totalAddrs}, Arrived: {this.props.tripDetails.arrivedAddrs}</h5>
                {/* Important! Always set the container height explicitly */}
                <div style={{ height: '50vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        {this.props.tripDetails.route.map(
                            (addr) => <MapMarkerComponent key={addr.id} lat={addr.lat} lng={addr.lng} text={addr.id.toString()} />
                        )}
                    </GoogleMapReact>
                </div>
            </>
        );
    }
}

export default TripDetailComponent;