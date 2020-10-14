import axios from "axios";
import { GEOCODING_API_URL } from "./ApiConfig";

class DataService {
    // Only for driver
    // userid, ROLE put in axios header
    driverGetTrips() {

    }

    driverCreateTrip(startTime) {
        let newTripId = 11;
        return newTripId;
    }

    driverFinishAddr(tripId, addrId) {

    }

    driverFinishTrip(tripId) {

    }

    // Only for rider
    // userid, ROLE put in axios header
    riderGetTrips() {

    }

    riderVerifyPasscode(passcode) {

    }

    riderCreateAddr() {

    }

    // For both driver, rider
    getTripDetails(tripId) {

    }

    refreshTripDetails(tripId) {
        // Must utilise backend's isRouteUpTodate
    }

    getGeocoding(addr) {
        return axios.get(`${GEOCODING_API_URL}&q=${addr}`);
    }

}

export default new DataService();