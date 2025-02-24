import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3308/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosClient;
