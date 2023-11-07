import {useState, useEffect} from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const Language = ({language}) => {
    return (
        <div>
            {language}
        </div>
    )
}

const Weather =({country}) => {
    const [weather, setWeather] = useState(null)

    //get weather from two consecutive API calls
    const hook = () => {
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&appid=${api_key}`)
        .then(response => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${api_key}`)
            .then(response => {
                setWeather(response.data)
            }
            )
        })
        .catch(error => {
            return (
                <div>
                    Error:
                </div>
            )
        })
    }
    useEffect(hook,[])
    if(weather) {
        return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature: {(weather.main.temp-273.15).toFixed(2)}°C</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <p>Wind Speed: {weather.wind.speed}m/s</p>
        </div>
        )
    }
}

const CountryDetails =  ({country}) => {
    const languages = Object.values(country.languages)
    return (
        <div>
            <h2>{country.name.common}</h2>
                <p>Capital City: {country.capital}</p>
                <p>Area: {country.area} km^2</p>
            <h3>Languages:</h3>
                {languages.map( (language,index) => <Language key={index} language={language}/>)}
            <img src={country.flags.png} alt={country.flags.alt}/>
        
        </div>
    )
}

const Country = ({country, size}) => {
    const [showMore, setShowMore] = useState(false)

    if( size != 1) {
        if(!showMore) {
            return (
                <div>
                    {country.name.common}
                    <button onClick={() => setShowMore(!showMore)}>{showMore ? 'hide' : 'show'}</button>
                </div>
            )
        } else {
            return (
            <div>
                <CountryDetails country={country}/>
                <Weather country={country}/>
                <button onClick={() => setShowMore(!showMore)}>{showMore ? 'hide' : 'show'}</button>
            </div>
            )
        }
    } else {
        return (
            <div>
                <CountryDetails country={country} />
                <Weather country={country}/>
            </div>
        )
    }
}

export default Country