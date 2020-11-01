import axios from 'axios';
import apijs from './api';

const api = axios.create({
    baseURL : apijs.base_url,
});

export default api;