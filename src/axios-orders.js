import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-eb532.firebaseio.com/'
});

export default instance;