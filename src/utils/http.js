import axios from 'axios'
const instance = axios.create({
    // baseURL: process.env.NODE_ENV=='production'?'':'',
    // timeout: 5000,
    // headers: { 'X-Custom-Header': 'foobar' }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default instance;