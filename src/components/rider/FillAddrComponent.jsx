import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import GoogleMapReact from "google-map-react";
// import { GOOGLE_MAPS_API_KEY } from "../../config/secret";
import DataService from "../../api/DataService";
import AuthService from "../../api/AuthService";
import MapMarkerComponent from "../map_marker/MapMarkerComponent";
import { ROLE } from "../../config/config"

class FillAddrComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addr: "",
            lat: null,
            lng: null,
            showMarker: false,
            showAddrError: false,
            addrError: ""
        }
        this.validate = this.validate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onContinue = this.onContinue.bind(this);
    };

    static defaultProps = {
        center: {
            lat: 42.447558,
            lng: -76.482747
        },
        zoom: 12
    };

    validate(values) {
        let errors = {};
        if (values.addr.length <= 4) {
            errors.addr = "Address must have at least 4 letters";
        }
        return errors;
    }

    checkAddr(values) {
        DataService.getGeocoding(values.addr)
            .then(response => this.setState({
                addr: values.addr,
                lat: response.data[0].lat,
                lng: response.data[0].lon,
                showMarker: true,
                showAddrError: false,
                addrError: ""
            }))
            .catch(() => this.setState({
                showMarker: false,
                showAddrError: true,
                addrError: "Invalid address. Please retry"
            }))
    }

    onSubmit(values) {
        this.checkAddr(values);
    }

    onContinue() {
        console.log(this.state);
        let rider = {
            surname: this.props.location.state.surname,
            givenName: this.props.location.state.givenName,
            status: this.props.location.state.status,
            station: this.props.location.state.station
        }
        DataService.riderCreateRider(rider)
            .then(response => {
                console.log(response.data);
                let tripId = this.props.location.state.tripId;
                let addr = {
                    riderId: response.data.id,
                    tripId: tripId,
                    addr: this.state.addr,
                    lat: this.state.lat,
                    lng: this.state.lng
                };
                DataService.riderCreateAddr(tripId, addr)
                    .then(response => {
                        console.log(response.data);
                        AuthService.createAddrSuccessful(
                            rider.surname,
                            rider.givenName,
                            ROLE.RIDER,
                            addr.riderId,
                            tripId,
                            response.data.id
                        );
                        this.props.history.push(`/rider/trip/${tripId}`);
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }

    render() {
        console.log(this.props.location.state);
        let { addr } = this.state;
        return (
            <>
                <h4>Choose destination</h4>
                <h5>Check if marker is at correct location</h5>
                {/* Important! Always set the container height explicitly */}
                <div style={{ height: '40vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        {this.state.showMarker && <MapMarkerComponent
                            lat={this.state.lat}
                            lng={this.state.lng}
                            text="+"
                        />}
                    </GoogleMapReact>
                </div>

                <div className="container">
                    <Formik
                        initialValues={{ addr }}
                        enableReinitialize={true}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="addr" component="div" className="alert alert-warning" />
                                    {this.state.showAddrError && <div className="alert alert-danger">{this.state.addrError}</div>}
                                    <fieldset className="form-group">
                                        <label><b>Address</b> (e.g. 700 Rosedale Ave)</label>
                                        <Field className="form-control" type="text" name="addr" />
                                    </fieldset>
                                    <button className="btn btn-info" type="submit">Show on map</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
                <hr />
                <p>If marker location is:</p>
                <p><b>Incorrect</b>: Please modify address and retry.</p>
                <p><b>Correct</b>: Click the button below to continue.</p>
                <button className="btn btn-success" onClick={this.onContinue}>Continue</button>
            </>
        );
    }
}

export default FillAddrComponent;