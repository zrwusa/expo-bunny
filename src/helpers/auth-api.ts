import axios, {AxiosResponse} from 'axios';
import {AuthAPIProtocol} from '../types';
import { getApiInstanceConfig} from './helpers';
import {checkAuthAPIProtocol} from './api-protocols';

export const apiAuth = axios.create(getApiInstanceConfig('auth'));

apiAuth.interceptors.request.use(
    async (config) => {
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    async error => {
        return Promise.reject(error);
    });

apiAuth.interceptors.response.use(
    (response: AxiosResponse<AuthAPIProtocol<any>>) => {
        // status 200-300
        checkAuthAPIProtocol(response.data);
        return response;
    },
    async (error) => {
        const {response, request} = error;
        if (response) {
            // status 300-600 The request was made and the server responded with a status code that falls out of the range of 2xx
            checkAuthAPIProtocol(response.data);
            return response;
        } else if (request) {
            // status 100-200 timeout The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
            throw error;
        } else {
            // Something happened in setting up the request and triggered an error
            throw error;
        }
    });

export default apiAuth;
