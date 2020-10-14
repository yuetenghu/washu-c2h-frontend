import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AuthService from "../../api/AuthService";
import { ROLE } from "../../config/config"

class DriverLoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surname: "",
            givenName: "",
            hasLoginFailed: false,
            showSuccessMsg: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate(values) {
        let errors = {};

        if (values.surname === "") errors.surname = "Enter surname";
        else if (values.givenName === "") errors.givenName = "Enter given name";

        return errors;
    }

    onSubmit(values) {
        // Dummy data: Doctor Who
        if (values.surname.trim().toLowerCase() === "who" && values.givenName.trim().toLowerCase() === "doctor") {
            AuthService.loginSuccessful(values.surname.trim(), values.givenName.trim(), ROLE.DRIVER);
            this.setState({
                hasLoginFailed: false,
                showSuccessMsg: true
            })
            this.props.history.push("/driver/trip");
        } else {
            this.setState({
                hasLoginFailed: true,
                showSuccessMsg: false
            })
        }
    }

    render() {
        let { surname, givenName } = this.state;
        return (
            <>
                <h4>Driver Login</h4>
                <div className="container">
                    <Formik
                        initialValues={{ surname, givenName }}
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
                                    {this.state.hasLoginFailed && <div className="alert alert-danger">Surname or given name incorrect</div>}
                                    {this.state.showSuccessMsg && <div className="alert alert-success">Login successful</div>}
                                    <fieldset className="form-group">
                                        <label>Surname</label>
                                        <Field className="form-control" type="text" name="surname" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Given name</label>
                                        <Field className="form-control" type="text" name="givenName" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Log in</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </>
        );
    }
}

export default DriverLoginComponent;