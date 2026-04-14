import axios from "axios";

export const endpoints = {
    'categories': '/categories/',
    'courses': '/courses/'
}

export default axios.create({
    baseURL: 'http://192.168.0.79:8000/'
})