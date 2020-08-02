import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-95251.firebaseio.com/'
});

export default instance;