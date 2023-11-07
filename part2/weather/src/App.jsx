import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/country'
import Country from './components/country'

function App() {
  const [countryFilter, setCountryFilter] = useState("")
  const [countryList, setCountryList] = useState([])

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const hook = () => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountryList(response.data)     
      })
  }
  useEffect(hook,[])

  let countriesShown = countryList.filter(country => country.name.common.includes(countryFilter) )
  let filterWarning
  if (countriesShown.length > 10) { 
    countriesShown = []
    filterWarning = "Too many matches, specify the filter"
  } else {
    filterWarning = ""
  }

  return (
    <div>
      <h1>Country Weather Website</h1>
      <div> Find country: <input value = {countryFilter} onChange={handleFilterChange}></input> </div>
      <div>{countriesShown.map((country,index) => <Country key={index} country ={country} size={countriesShown.length}/>)} </div>
      {filterWarning}
    </div>
  )
}

export default App
