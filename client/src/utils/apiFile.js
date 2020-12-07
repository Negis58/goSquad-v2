import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/types';

const apiFile = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

apiFile.interceptors.response.use(
    res => res,
    err => {
        if (err.response.status === 401) {
            store.dispatch({ type: LOGOUT });
        }
        return Promise.reject(err);
    }
);

export default apiFile;
