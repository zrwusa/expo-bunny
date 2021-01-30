import axios from "axios";
import store from "../stores";
import bunnyConfig from "../config.json";

// interface Seal {
//     name: string;
//     url: string;
// }
// interface API {
//     "/user": { name: string; age: number; phone: string };
//     "/seals": { seal: Seal[] };
// }
// const apiXXX = <URL extends keyof API>(url: URL): Promise<API[URL]> => {
//     return fetch(url).then((res) => res.json());
// };

const httpPrefix = bunnyConfig.isHttps ? 'https://' : 'http://';
const feApiTail = bunnyConfig.isDevServerProxy ? Object.keys(bunnyConfig.devServerProxy)[0] : '';

const api = axios.create({
    baseURL: bunnyConfig.isDevServerProxy
        ? `${bunnyConfig.devServer.domain}${bunnyConfig.devServer.port}${feApiTail}`
        : bunnyConfig.isRemoteBackEnd
            ? `${httpPrefix}${bunnyConfig.remoteBackEnd.domain}:${bunnyConfig.remoteBackEnd.port}`
            : `${httpPrefix}${bunnyConfig.localBackEnd.domain}:${bunnyConfig.localBackEnd.port}`,
});

api.interceptors.request.use(
    async config => {
        const {authState} = store.getState();
        if (authState.accessToken) {
            config.headers = {
                "Authorization": `Bearer ${authState.accessToken}`,
                // "Accept": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        if (bunnyConfig.isHttps) {
        }
        return config;
    },
    async error => {
        return Promise.reject(error)
    });

api.interceptors.response.use(
    (response) => {
        return response
    },
    async function (error) {
        if (error.response === undefined) {
            console.error(`[React Bunny Warn]Request failed,first do not forget to run the mock server in another terminal with command 'yarn mock'`)
        }
        const originalRequest = error.config;
        // if (!response.ok) {
        //     if ([401, 403].indexOf(response.status) !== -1) {
        //         // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        //         authenticationService.logout();
        //         location.reload(true);
        //     }
        //
        //     const error = (data && data.message) || response.statusText;
        //     return Promise.reject(error);
        // }

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            // const access_token = await refreshAccessToken();
            const access_token = "";
            axios.defaults.headers.common["Authorization"] = `Bearer ` + access_token;
            return api(originalRequest);
        } else if (error.response.status === 401) {
        }
        return Promise.reject(error);
    });
export default api;
