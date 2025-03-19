import axios from "axios";

const API_URL = "http://localhost:8080/api";

const api = axios.create(
    {
        baseURL: API_URL,
        withCredentials: true
    }
);

api.interceptors.request.use(
    (config) => {
        const authData = localStorage.getItem("auth");
        console.log("Auth Data" + authData);
        if (authData) {
            console.log(authData)
            const token:string = JSON.parse(authData).token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                console.log("[API] Requisição para:", config.url, "com token:", token ? "Sim" : "Não");
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
