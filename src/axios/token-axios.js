import axios from 'axios';

export const axiosTokenInstance = axios.create({
    baseUrl: 'https://giftwizitapi.azurewebsites.net/api'
})