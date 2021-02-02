import axios from 'axios';

const url = window.location.hostname==='localhost' ? '': 'https://drawing-challenge-server.herokuapp.com';

axios.defaults.baseURL = url+'/api';

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
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