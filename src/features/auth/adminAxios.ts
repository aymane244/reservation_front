import axios from 'axios';
import { url } from '../../../public/helpers';

const adminAxios = axios.create({
    baseURL: url,
});

export const setAdminToken = (token: string) => {
    adminAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAdminToken = () => {
    delete adminAxios.defaults.headers.common['Authorization'];
};

export default adminAxios;
