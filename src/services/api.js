import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rocketnotes-p4vx.onrender.com',
});

export default api;
