import { useState } from "react";

// Component to handle filtering of persons
const Filter = ({ filterValue, handleFilterChange }) => {
  return (
    <div>
      {/* Display filter input */}
      filter shown with <input value={filterValue} onChange={handleFilterChange} />
    </div>
  );
};

// Component for adding a new person
const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        {/* Input for entering new name */}
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        {/* Input for entering new number */}
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        {/* Button to submit the new person */}
        <button type="submit">add</button>
      </div>
    </form>
  );
};

// Component to display the list of persons
const Persons = ({ persons }) => {
  return (
    <ul>
      {/* Map through the persons array and display each person */}
      {persons.map((person, index) => (
        <li key={index}>{person.name} {person.number}</li>
      ))}
    </ul>
  );
};

// Main App component
const App = () => {
  // State to manage the list of persons
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '672253023', id: 1 },
    { name: 'Arnau Gallego', number: '671512305', id: 2 },
    { name: 'Marc Fleck', number: '6758493', id: 3 },
    { name: 'Josep Rubió', number: '678978345', id: 4 }
  ]);
  // States to manage new person input fields and filter value
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');

  // Event handler for changing name input
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Event handler for changing number input
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // Event handler for changing filter input
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  // Function to add a new person to the list
  const addPerson = (event) => {
    event.preventDefault();

    // Check if the name already exists in the list
    const nameExists = persons.some(person => person.name === newName);

    if (nameExists) {
      // Alert if the name already exists
      alert(`${newName} is already added to the phonebook`);
    } else {
      // If the name doesn't exist, create a new person object and update the list
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      };
      setPersons(persons.concat(personObject));
      // Reset input fields
      setNewName('');
      setNewNumber('');
    }
  };

  // Filter the persons based on the filter input
  const filteredPersons = filterValue === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Display filter component */}
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      {/* Display form to add a new person */}
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      {/* Display list of persons */}
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
