import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { GOOGLE_MAPS_API_KEY } from "../config/config";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class TripDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    render() {
        return (
            <>
                <h4>Start time: [Oct/6 8:00pm]</h4>
                <h4>Passcode: [OLD789]</h4>
                <h5>Total: [5], Arrived: [1]</h5>
                {/* Important! Always set the container height explicitly */}
                <div style={{ height: '50vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        <AnyReactComponent
                            lat={59.955413}
                            lng={30.337844}
                            text="My Marker"
                        />
                    </GoogleMapReact>
                </div>
            </>
        );
    }
}

export default TripDetailComponent;