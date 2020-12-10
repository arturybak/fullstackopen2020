import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'


const Filter = ({ filter, onChange }) => {
    return(
        <div>
        filter shown with <input value={filter} onChange={onChange}/>
        </div>
    )
}

const Person = ({ person, deletePersonOf }) => <p>{person.name} {person.number}<button onClick={deletePersonOf}>delete</button>
</p>


const Persons = ({ personsToShow, deletePersonOf }) => personsToShow.map(person => <Person key={person.name} person={person} deletePersonOf={deletePersonOf(person)} />)

const PersonForm = ({ onSubmit,  name, nameChange, number, numberChange}) => {
    return(
        <form onSubmit={onSubmit}>
            <div>
            name: <input value={name}
            onChange={nameChange}/>
            </div>
            <div>
            number: <input value={number}
            onChange={numberChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('Write Name Here')
  const [ newNumber, setNewNumber ] = useState('Write Number Here')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ notificationType, setNotificationType ] = useState('notification')



  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }
    const found = persons.find( person => person.name === newName )
    if(found !== undefined){
        window.alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
        personService
          .update(found.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson))
            setNotificationType('notification')
            setNotification(`Modified '${found.name}'s number`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationType('error')
            setNotification(`${found.name} has already been removed from the server`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
    } else {
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationType('notification')
        setNotification(`Added '${personObject.name}'`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
        //setNewName('')
        //setNewNumber('')
      })
      .catch(error => {
        setNotificationType('error')
        setNotification(`Could not add ${personObject.name} to the server`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }

  const deletePersonOf = person => () => {
    if (window.confirm(`Delete ${person.name}?`)) { 
      personService
        .deletePerson(person.id)
        .then(personService.getAll().then(initialPersons => {setPersons(initialPersons)}))
        .catch(error => {
          setNotificationType('error')
          setNotification(`Could not delete ${person.name} from the server`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const personsToShow = setNewFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />

      <Filter filter={newFilter} onChange={handleFilterChange} />
      
      <h3>add a new</h3>
      
      <PersonForm  onSubmit={addPerson} name={newName} nameChange={handleNameChange} 
      number={newNumber} numberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} deletePersonOf={deletePersonOf}/>
        
    </div>
  )
}

export default App