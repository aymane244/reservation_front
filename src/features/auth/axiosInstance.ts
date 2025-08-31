import axios from 'axios';
import { url } from '../../../public/helpers';

const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true,
});

export const centralAxios = axios.create({
    baseURL: url, // central API
    withCredentials: true,
});

export const tenantAxios = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

export default axiosInstance;