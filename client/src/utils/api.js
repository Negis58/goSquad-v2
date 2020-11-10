import axios from 'axios';
import LocalStorageService from "./LocalStorageService";
import React from 'react'

const localStorageService = LocalStorageService.getService();
const apiUrl = 'localhost:5000/api/refresh-token'

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    config => {
        const token = localStorageService.getAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

api.interceptors.response.use((response) => {
    return response;
}, function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest.url === apiUrl) {
        window.location = "/login";
        return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorageService.getRefreshToken();
        return api.post('/auth/refresh-token', {
            "refresh_token": refreshToken
        }).then(res => {
            if (res.status === 201) {
                localStorageService.setToken(res.data);
                api.defaults.headers.common['Authorization'] = 'Bearer' + localStorageService.getAccessToken();
                return api(originalRequest);
            }
        })
    }
    return Promise.reject(error);
});



export default api;