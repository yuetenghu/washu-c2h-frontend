import React, { Component } from "react";

class VerifyTripComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <h4>Kindly ask driver for passcode</h4>
                <p>Every schedule has a <b>unique passcode.</b></p>
                <p>This helps to verify you're on the <b>right shuttle.</b></p>
                <p>Case-<b>in</b>sensitive (e.g. CAT/cat both ok)</p>

                <h4>Password</h4>
                <p>[6-box input here]</p>
                <button className="btn btn-success" type="submit">Verify</button>

                <br />
                [Below only shows if passcode is valid]
                <h4>Confirm schedule</h4>
                <p>Your password matches this trip</p>
                <h5>Scheduled departure:</h5>
                <h5>[Date and time]</h5>
                <button className="m-2 btn btn btn-secondary">⇦ Back</button>
                <button className="m-2 btn btn btn-success">Confirm</button>
            </>
        );
    }
}

export default VerifyTripComponent;