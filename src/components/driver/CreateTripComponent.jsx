import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

class CreateTripComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: ""
        }
    }

    render() {
        let { startTime } = this.state;
        const minStartDatetime =  new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString().substring(0, 16);
        const maxStartDatetime =  new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString().substring(0, 16);
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
                                    <ErrorMessage name="surname" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="givenName" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Start time</label>
                                        <Field className="form-control" type="datetime-local" min={minStartDatetime} max={maxStartDatetime} step="900" name="startTime" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Create</button>
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