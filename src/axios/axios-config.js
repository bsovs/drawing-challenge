import axios from 'axios';

const url = window.location.hostname==='localhost' ? 'http://localhost:8080': 'https://drawing-challenge-server.herokuapp.com';

axios.defaults.baseURL = url+'/api';

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  config.headers.Authorization || (token ? `Bearer ${token}` : '');
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axios;