import axios from 'axios'

const documentApi = axios.create({
    baseURL: 'http://localhost:8080/api/posts/',
})

export const getAllDocuments = () => documentApi.get("/")

