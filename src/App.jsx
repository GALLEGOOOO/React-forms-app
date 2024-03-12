import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import useStateCustomHook from "../hooks"; // Importa el custom hook

const App = () => {
  // Utiliza el custom hook para manejar el estado de persons, newName, newNumber, y filterValue
  const [persons, setPersons] = useStateCustomHook([
    { name: "Arto Hellas", number: "672253023", id: 1 },
    { name: "Arnau Gallego", number: "671512305", id: 2 },
    { name: "Marc Fleck", number: "6758493", id: 3 },
    { name: "Josep Rubió", number: "678978345", id: 4 },
  ]);

  const [newName, setNewName] = useStateCustomHook("");
  const [newNumber, setNewNumber] = useStateCustomHook("");
  const [filterValue, setFilterValue] = useStateCustomHook("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const filteredPersons =
    filterValue === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterValue.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
