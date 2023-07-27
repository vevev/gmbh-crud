import axios from "axios";
import { HTTP_UNAUTHORIZED } from './http-code';

axios.interceptors.request.use(function (config) {
    config.baseURL = process.env.REACT_APP_URL;
    config.headers['x-access-token'] = '';

    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    switch (response.status) {
        case HTTP_UNAUTHORIZED:
            console.log(11111111111111);
    }

    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axios;