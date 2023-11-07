import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = 'api/persons' //can change it to this if running from same website

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl,newObject)
}

const deleteEntry = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
} 

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`,newObject)
}

export default {getAll, create, deleteEntry, update}