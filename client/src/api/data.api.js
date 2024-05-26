import axios from 'axios'

const documentApi = axios.create({
    baseURL: 'http://localhost:8080/api/',
})

export const getAllTopics = () => documentApi.get("topics/")
export const getTopic = (id) => documentApi.get(`topics/${id}/`)
export const createTopic = (data) => documentApi.post("topics/", data)
export const updateTopic = (id, data) => documentApi.put(`topics/${id}/`, data)
export const deleteTopic = (id) => documentApi.delete(`topics/${id}/`)


export const getAllTeachers = () => documentApi.get("teachers/")
export const getTeacher = (id) => documentApi.get(`teachers/${id}/`) 
export const createTeacher = (data) => documentApi.post("teachers/", data)
export const updateTeacher = (id, data) => documentApi.put(`teachers/${id}/`, data)
export const deleteTeacher = (id) => documentApi.delete(`teachers/${id}/`)