import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TimeUtils from "../../utils/TimeUtils";
import AuthService from "../../api/AuthService";
import DataService from "../../api/DataService"

class CreateTripComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: TimeUtils.toLocalISOString(new Date(Date.now())).substring(0, 16),
            minStartDatetime: TimeUtils.toLocalISOString(new Date(Date.now() - 1000 * 60 * 60 * 3)).substring(0, 16),
            maxStartDatetime: TimeUtils.toLocalISOString(new Date(Date.now() + 1000 * 60 * 60 * 3)).substring(0, 16)
        };
        this.validate = this.validate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    validate(values) {
        let errors = {};
        if (values.startTime === "") errors.startTime = "Please choose a time"
        else if (values.startTime < this.state.minStartDatetime || values.startTime > this.state.maxStartDatetime) {
            errors.startTime = "Start time must be between "
                + this.state.minStartDatetime.replace("T", " ")
                + " and "
                + this.state.maxStartDatetime.replace("T", " ");
        }
        return errors;
    }

    onSubmit(values) {
        if (window.confirm("Schedule at time: " + values.startTime.replace("T", " ") + " ?")) {
            let driverId = AuthService.getLoggedInUserId();
            let trip = {
                id: -1,  // This is to be ignored by backend, and replaced by @GeneratedValue
                startTime: new Date(values.startTime).toISOString()
            }
            DataService.driverCreateTrip(driverId, trip)
                .then(response => {
                    this.props.history.push("/driver/trip/" + response.data.id);
                })
                .catch(e => console.log(e));
            // this.props.history.push("/driver/trip/" + response);

        }
        return;
    }

    render() {
        let { startTime } = this.state;
        return (
            <>
                <h4>Create a new trip</h4>
                <div className="container">
                    <Formik
                        initialValues={{ startTime }}
                        enableReinitialize={true}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="startTime" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Start time</label>
                                        <Field className="form-control" type="datetime-local" min={this.state.minStartDatetime} max={this.state.maxStartDatetime} name="startTime" />
                                    </fieldset>
                                    <a href="/rider/trip" className="m-1 btn btn-secondary">⇦ Back</a>
                                    <button className="m-1 btn btn-success" type="submit">Create</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </>
        )
    }
}

export default CreateTripComponent;