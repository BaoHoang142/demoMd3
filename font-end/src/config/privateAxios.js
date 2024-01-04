import axios from "axios";

const baseURL = "http://localhost:7000";

const privateAxios = axios.create({
    baseURL,
});

privateAxios.interceptors.request.use((config) => {
    const jwtTokent = localStorage.getItem("token");
    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtTokent}`,
        },
    };
});

export default privateAxios;