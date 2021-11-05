import axios, {AxiosResponse} from 'axios';
import {authLaborContext} from '../providers/auth-labor';
import {BunnyAPIProtocolResponseData} from '../types';
import {checkBunnyAPIProtocol, getApiInstanceConfig} from './helpers';

export const defaultBunnyAPIResponseData = {
    'httpExtra': {
        'code': 0,
        'message': '',
        'description': '',
        'errorCode': 0,
        'errorMessage': '',
        'errorDescription': '',
        'errorStack': ''
    },
    'businessLogic': {
        'code': '',
        'message': '',
        'description': '',
        'errorCode': '',
        'errorMessage': '',
        'errorDescription': '',
        'errorStack': ''
    },
    'successData': null,
    'timeSpent': 0
};
export const bunnyAPI = axios.create(getApiInstanceConfig('bunny'));


bunnyAPI.interceptors.request.use(
    async (config) => {
        config.headers['Content-Type'] = 'application/json';
        const {accessToken} = await authLaborContext.authFunctions.getPersistenceAuth();
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    async error => {
        return Promise.reject(error);
    });

bunnyAPI.interceptors.response.use(
    (response: AxiosResponse<BunnyAPIProtocolResponseData<any>>) => {
        // status 200-299
        checkBunnyAPIProtocol(response.data);
        return response;
    },
    async (error) => {
        const {response, request, config} = error;
        if (response) {
            // status 300-599 The request was made and the server responded with a status code that falls out of the range of 2xx
            const {status, data} = response;
            switch (status) {
                case 401:
                    const {business_logic} = data;
                    const {error_code} = business_logic;
                    if (['01_001_B_002', '01_001_B_003', '01_001_B_004', '01_001_B_005', '01_001_B_012'].includes(error_code)) {
                        const {authFunctions} = authLaborContext;
                        const {bunnyRefreshAuth, logOut} = authFunctions;
                        try {

                            const {success} = await bunnyRefreshAuth();
                            if (!success) {
                                await logOut('API');
                            } else {
                                const originalRequest = config;
                                originalRequest._retry = true;
                                return bunnyAPI(originalRequest);
                            }
                        } catch (e) {
                            await logOut('API');
                            throw e;
                        }
                    }
                    break;
                case 500:
                    throw error;
                default:
                    break;
            }
            checkBunnyAPIProtocol(response.data);
            return response;
        } else if (request) {
            // status 100-199 timeout The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
            throw error;
        } else {
            // Something happened in setting up the request and triggered an error
            throw error;
        }
    });

export default bunnyAPI;

