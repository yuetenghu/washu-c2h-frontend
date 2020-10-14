// import axios from "axios";

export const GIVEN_NAME_SESSION_KEY = "givenName";
export const ROLE_SESSION_KEY = "role";
export const TRIP_ID = "tripId";
export const ADDR_ID = "addrId";

class AuthService {
    driverAuth(surname, givenName) {
        
    }

    loginSuccessful(surname, givenName, role) {
        sessionStorage.setItem(GIVEN_NAME_SESSION_KEY, givenName);
        sessionStorage.setItem(ROLE_SESSION_KEY, role);
    }

    verificationSuccessful(tripId) {
        sessionStorage.setItem(TRIP_ID, tripId);
    }
}

export default new AuthService();