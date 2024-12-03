import axios from 'axios'

const documentApi = axios.create({
    baseURL: 'http://localhost:8080/api/',
})

/**
 * Obtiene todos los temas.
 * @returns {Promise} Una promesa que se resuelve con los temas obtenidos.
 */
export const getAllTopics = () => documentApi.get("topics/")

/** @function getTopic 
 * @description Obtiene un tema por su ID.
 * @param {number} id - El ID del tema.
 * @returns {Promise} - Una promesa que se resuelve con los datos del tema.
 */
export const getTopic = (id) => documentApi.get(`topics/${id}/`)

/** @function createTopic
 * @description Crea un nuevo tema.
 * @param {Object} data - Los datos del tema a crear.
 * @returns {Promise} - Una promesa que se resuelve con la respuesta del servidor.
 */
export const createTopic = (data) => documentApi.post("topics/", data)
export const updateTopic = (id, data) => documentApi.put(`topics/${id}/`, data)
export const deleteTopic = (id) => documentApi.delete(`topics/${id}/`)


export const getAllTeachers = () => documentApi.get("teachers/")
export const getTeacher = (id) => documentApi.get(`teachers/${id}/`) 
export const createTeacher = (data) => documentApi.post("teachers/", data)
export const updateTeacher = (id, data) => documentApi.put(`teachers/${id}/`, data)
export const deleteTeacher = (id) => documentApi.delete(`teachers/${id}/`)