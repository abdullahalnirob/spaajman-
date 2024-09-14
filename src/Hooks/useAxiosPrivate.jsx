import axios from "axios";

const axiosPrivate = axios.create({
    // Rafel
    // baseURL: "https://server-coral-alpha-78.vercel.app"

    // local
    baseURL: "http://localhost:5000"

    // Arafat
    // baseURL: 'https://spaajman-server.vercel.app'
});
const useAxiosPrivate = () => {
    return axiosPrivate;
};

export default useAxiosPrivate;