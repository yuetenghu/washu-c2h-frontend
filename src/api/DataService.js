import axios from "axios";
import { C2H_API_URL_JPA, GEOCODING_API_URL } from "./ApiConfig";

class DataService {
    // Only for driver
    // userid, ROLE put in axios header
    driverGetTrips(driverId) {
        return axios.post(`${C2H_API_URL_JPA}/driver/trip`, { id: driverId });
    }

    driverCreateTrip(driverId, trip) {
        return axios.post(`${C2H_API_URL_JPA}/driver/${driverId}/trip/new`, trip);
    }

    driverFinishAddr(tripId, addrId) {
        return axios.put(`${C2H_API_URL_JPA}/driver/trip/${tripId}/addr/${addrId}`);
    }

    driverFinishTrip(tripId) {
        return axios.put(`${C2H_API_URL_JPA}/driver/trip/${tripId}`);
    }

    // Only for rider
    // userid, ROLE put in axios header
    riderGetTrips(tripId) {
        // Now only assume find trip by rider's submitted JOT data's tripId
        return this.getTripDetails(tripId);
    }

    riderVerifyPasscode(passcode) {
        return axios.get(`${C2H_API_URL_JPA}/rider/passcode/${passcode.toUpperCase()}`);
    }

    riderCreateRider(rider) {
        return axios.post(`${C2H_API_URL_JPA}/rider/new`, rider);
    }

    riderCreateAddr(tripId, addr) {
        return axios.post(`${C2H_API_URL_JPA}/rider/trip/${tripId}/addr/new`, addr);
    }

    // For both driver, rider
    getTripDetails(tripId) {
        return axios.get(`${C2H_API_URL_JPA}/trip/${tripId}`)
    }

    refreshTripDetails(tripId) {
        // Must utilise backend's isRouteUpTodate
    }

    getGeocoding(addr) {
        return axios.get(`${GEOCODING_API_URL}&q=${addr}`);
    }

}

export default new DataService();