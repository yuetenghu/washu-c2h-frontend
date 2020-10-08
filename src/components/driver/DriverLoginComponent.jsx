import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

class DriverLoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surname: "",
            givenName: ""
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