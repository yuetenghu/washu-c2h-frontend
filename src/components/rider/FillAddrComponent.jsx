import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import GoogleMapReact from "google-map-react";
import { GOOGLE_MAPS_API_KEY } from "../../config/config";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class FillAddrComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addr: ""
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
        let { addr } = this.state;
        return (
            <>
                <h4>Choose destination</h4>
                <h5>Check if marker is at correct location</h5>
                {/* Important! Always set the container height explicitly */}
                <div style={{ height: '40vh', width: '100%' }}>
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
                <hr/>
                <p>If marker location is:</p>
                <p><b>Incorrect</b>: Please modify address and retry.</p>
                <p><b>Correct</b>: Click the button below to continue.</p>
                <button className="btn btn-success" type="submit">Continue</button>
            </>
        );
    }
}

export default FillAddrComponent;