import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, onChange }) => {
    return(
        <div>
        find countries <input value={filter} onChange={onChange}/>
        </div>
    )
}

const Country = ({ country, detailed, onClick }) => {
    const showDetailed = detailed
    if (showDetailed) {
        return (
            <div>
                <h1>{country.name}</h1>
                <p>capital: {country.capital}</p>
                <p>population: {country.population}</p>
                <h2>languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
                </ul>
                <img src={country.flag} alt="Flag image" height={200} width={300} />
            </div>
        )
    } else {
        return (
            <p>
                {country.name}
                <button onClick={onClick(country.name)}>show</button>
            </p>
        )
    }
}

const Countries = ({ countriesToShow, onClick}) => {
    const numShown = countriesToShow.length

    if (numShown > 10){
        return <p>Too many matches, specify another filter</p>
    } else if(numShown > 1) {
        return ( 
            countriesToShow.map(country => <Country key={country.name} country={country} detailed={false} onClick={onClick}/>)
        )
    } else if(numShown === 1) {
        return (
            <Country country={countriesToShow[0]} detailed={true} onClick={onClick}/>
        )
    } else {
        return null
    }
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  const handleDetailedView = country => () => setNewFilter(country)


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const countriesToShow = setNewFilter === ''
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <Filter filter={newFilter} onChange={handleFilterChange} />

      <Countries countriesToShow={countriesToShow} onClick={handleDetailedView}/>
        
    </div>
  )
}

export default App