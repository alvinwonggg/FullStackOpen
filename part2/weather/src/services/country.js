import axios from 'axios'
const baseUrl = `https://studies.cs.helsinki.fi/restcountries/`

const getAll = () => {
    return axios.get(`${baseUrl}/api/all`)
}

const getWeather = (country) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
}

export default {getAll}