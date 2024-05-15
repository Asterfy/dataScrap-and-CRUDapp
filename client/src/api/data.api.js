import axios from 'axios'

const documentApi = axios.create({
    baseURL: 'http://localhost:8080/api/',
})

export const getAllTopics = () => documentApi.get("topics/")

export const getAllTeachers = () => documentApi.get("teachers/")