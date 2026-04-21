import axios from "axios";

export const endpoints = {
    'categories': '/categories/',
    'courses': '/courses/'
}

export default axios.create({
    baseURL: "http://192.168.2.23:8000/"
})