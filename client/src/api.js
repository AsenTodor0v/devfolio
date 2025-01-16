import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const BASE_URL = "http://127.0.0.1:8000"

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');
        if (token) {
            const decodeToken = jwtDecode(token);
            const expiry_date = decodeToken.exp;
            const current_date = Date.now() / 1000;
            if (expiry_date > current_date) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;