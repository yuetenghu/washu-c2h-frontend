import { LOCATIONIQ_ACCESS_TOKEN } from "../config/secret";

export const C2H_API_URL = "http://localhost:8080";
export const C2H_API_URL_JPA = "https://localhost:8080/jpa";
export const GEOCODING_API_URL = `https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_ACCESS_TOKEN}&format=json`;
