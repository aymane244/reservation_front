import axios from 'axios';
import { url } from '../../../public/helpers';

const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true,
});

export default axiosInstance;