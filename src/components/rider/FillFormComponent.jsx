import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { STATUS, STATIONS } from "../../config/config";

class FillFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surname: "",
            givenName: "",
            status: "",
            station: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate(values) {
        let errors = {};
        if (values.surname === "") errors.surname = "Enter surname";
        else if (values.givenName === "") errors.givenName = "Enter given name";
        else if (values.status === "" || values.status === "placeholder") errors.status = "Choose status";
        else if (values.station === "" || values.station === "placeholder") errors.station = "Choose station";
        return errors;
    }

    onSubmit(values) {
        this.setState({
            surname: values.surname,
            givenName: values.givenName,
            status: values.status,
            station: values.station
        });
        this.props.history.push({
            pathname: "/rider/fill-addr",
            state: {
                ...this.state,
                tripId: this.props.location.state.tripId
            }
        })
    }

    render() {
        let { surname, givenName, status, station } = this.state;
        return (
            <>
                <h4>Rider Info</h4>
                <h4>{this.state.tripId}</h4>
                <div className="container">
                    <Formik
                        initialValues={{ surname, givenName, status, station }}
                        enableReinitialize={true}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="surname" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="givenName" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="status" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="station" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Surname</label>
                                        <Field className="form-control" type="text" name="surname" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Given name</label>
                                        <Field className="form-control" type="text" name="givenName" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Status</label>
                                        <Field className="form-control" as="select" name="status">
                                            <option value="placeholder">-- Choose one --</option>
                                            {Object.entries(STATUS).map(
                                                (e) =>
                                                    <option key={e} value={e[0]}>{e[1]}</option>
                                            )}
                                        </Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Station</label>
                                        <Field className="form-control" as="select" name="station">
                                            <option value="placeholder">-- Choose one --</option>
                                            {Object.entries(STATIONS).map(
                                                (e) =>
                                                    <option key={e} value={e[0]}>{e[1]}</option>
                                            )}
                                        </Field>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Submit</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </>
        );
    }
}

export default FillFormComponent;