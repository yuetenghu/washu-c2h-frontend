import axios from "axios";
import { C2H_API_URL_JPA } from "./ApiConfig"

export const GIVEN_NAME_SESSION_KEY = "givenName";
export const USERID = "userid";
export const ROLE_SESSION_KEY = "role";
export const TRIP_ID = "tripId";
export const ADDR_ID = "addrId";

class AuthService {
    driverAuth(surname, givenName) {
        return axios.post(`${C2H_API_URL_JPA}/driver/auth`, { surname, givenName });
    }

    isUserLoggedIn() {
        return sessionStorage.getItem(USERID) !== null;
    }

    logOut() {
        sessionStorage.clear();
    }

    loginSuccessful(surname, givenName, role, userid) {
        sessionStorage.setItem(GIVEN_NAME_SESSION_KEY, givenName);
        sessionStorage.setItem(ROLE_SESSION_KEY, role);
        sessionStorage.setItem(USERID, userid);
    }

    createAddrSuccessful(surname, givenName, role, userid, tripId, addrId) {
        sessionStorage.setItem(GIVEN_NAME_SESSION_KEY, givenName);
        sessionStorage.setItem(ROLE_SESSION_KEY, role);
        sessionStorage.setItem(USERID, userid);
        sessionStorage.setItem(TRIP_ID, tripId);
        sessionStorage.setItem(ADDR_ID, addrId);
    }

    getLoggedInUserId() {
        return sessionStorage.getItem(USERID);
    }

    // verificationSuccessful(tripId) {
    //     sessionStorage.setItem(TRIP_ID, tripId);
    // }
}

export default new AuthService();