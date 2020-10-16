import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import AuthService from "../AuthService";
import DataService from "../../api/DataService";
import TimeUtils from "../../utils/TimeUtils";

class VerifyTripComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passcode: "",
            isPasscodeWrong: false,
            showVerifyInput: true,
            showTripInfo: false,
            matchedStartTime: null
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    validate(values) {
        let errors = {};
        if (values.passcode === "") errors.passcode = "Enter passcode";
        else if (values.passcode.trim().length !== 6) errors.passcode = "Make sure the length is 6";
        return errors;
    }

    onSubmit(values) {
        DataService.riderVerifyPasscode(values.passcode)
            .then(response => {
                this.setState({
                    isPasscodeWrong: false,
                    showVerifyInput: false,
                    showTripInfo: true,
                    matchedTripId: response.data.id,
                    matchedStartTime: TimeUtils.toDisplayString(response.data.startTime)
                });

            })
            .catch(e => {
                console.log(e);
                this.setState({
                    isPasscodeWrong: true,
                    showVerifyInput: true,
                    showTripInfo: false,
                    matchedTripId: null,
                    matchedStartTime: null
                })
            });
    }

    onCancel() {
        this.setState({
            showVerifyInput: true,
            showTripInfo: false,
            matchedStartTime: null
        })
    }

    onConfirm() {
        this.props.history.push({
            pathname: "/rider/fill-form",
            state: { tripId: this.state.matchedTripId }
        });
        // this.props.history.push("/rider/fill-form", { tripId: this.state.matchedTripId });
    }

    render() {
        let passcode = this.state.passcode;
        return (
            <>
                <h4>Kindly ask driver for passcode</h4>
                <p>Every schedule has a <b>unique passcode.</b></p>
                <p>This helps to verify you're on the <b>right shuttle.</b></p>
                <p>Case-<b>in</b>sensitive (e.g. CAT/cat both ok)</p>

                {this.state.showVerifyInput && <>
                    <h4>Passcode</h4>
                    <div className="container">
                        <Formik
                            initialValues={{ passcode }}
                            enableReinitialize={true}
                            onSubmit={this.onSubmit}
                            validate={this.validate}
                            validateOnChange={false}
                            validateOnBlur={false}
                        >
                            {
                                (props) => (
                                    <Form>
                                        <ErrorMessage name="passcode" component="div" className="alert alert-warning" />
                                        {this.state.isPasscodeWrong && <div className="alert alert-danger">Passcode incorrect. Please retry</div>}
                                        <fieldset className="form-group">
                                            <label>3-letter word + 3-digit number</label>
                                            <Field className="form-control" type="text" name="passcode" />
                                        </fieldset>
                                        <button className="btn btn-success" type="submit">Verify</button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </>}

                {this.state.showTripInfo && <>
                    <br />
                    <h4>Confirm schedule</h4>
                    <p>Your password matches this trip</p>
                    <h5>Scheduled departure:</h5>
                    <h5>{this.state.matchedStartTime}</h5>
                    <p>Is it correct?</p>
                    <button className="m-2 btn btn btn-secondary" onClick={this.onCancel}>Cancel</button>
                    <button className="m-2 btn btn btn-success" onClick={this.onConfirm}>Confirm</button>
                </>}
            </>
        );
    }
}

export default VerifyTripComponent;