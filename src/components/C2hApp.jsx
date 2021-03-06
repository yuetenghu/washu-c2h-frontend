import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeComponent from "./HomeComponent";
import HeaderComponent from "./HeaderComponent"
import FooterComponent from "./FooterComponent";
import ErrorComponent from "./ErrorComponent";
import DriverLoginComponent from "./driver/DriverLoginComponent";
import TripListComponent from "./TripListComponent"
import CreateTripComponent from "./driver/CreateTripComponent";
import DriverTripViewComponent from "./driver/DriverTripViewComponent";
import VerifyTripComponent from "./rider/VerifyTripComponent"
import FillFormComponent from "./rider/FillFormComponent";
import FillAddrComponent from "./rider/FillAddrComponent";
import RiderTripViewComponent from "./rider/RiderTripViewComponent";
import LogOutComponent from "./LogOutComponent";
import AboutComponent from "./AboutComponent"

class C2hApp extends Component {
    render() {
        return (
            <div className="C2hApp">
                <Router>
                    <HeaderComponent />
                    <Switch>
                        <Route path="/" exact component={HomeComponent} />
                        <Route path="/log-out" component={LogOutComponent} />

                        <Route path="/driver/login" component={DriverLoginComponent} />
                        <Route path="/driver/trip/:tripId" component={DriverTripViewComponent} />
                        <Route path="/driver/trip" component={TripListComponent} />
                        <Route path="/driver/create-trip" component={CreateTripComponent} />

                        <Route path="/rider/trip/:tripId" component={RiderTripViewComponent} />
                        <Route path="/rider/trip" component={TripListComponent} />
                        <Route path="/rider/verify-trip" component={VerifyTripComponent} />
                        <Route path="/rider/fill-form" component={FillFormComponent} />
                        <Route path="/rider/fill-addr" component={FillAddrComponent} />

                        <Route path="/about" component={AboutComponent} />

                        <Route component={ErrorComponent} />
                    </Switch>
                    <FooterComponent />
                </Router>
            </div>
        )
    }
}


export default C2hApp;