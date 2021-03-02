import React, { useState, useEffect } from 'react';
import ListPerson from './components/ListPerson';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'

import './App.css';

function App() {

  // How many users to fetch from API
  const userCount = 20;
  
  const [persons, setPersons] = useState([]);
  
  const [groupA, setGroupA] = useState([]);
  const [groupB, setGroupB] = useState([]);

  // Get all all data from data service
  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?inc=name&noinfo&results=${userCount}`)
      .then(response => {
        setPersons(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    event.target.classList.contains('active') ? event.target.classList.remove('active') : event.target.classList.add('active');
  }

  console.log(persons);
  const handleClickToGroupA = (event) => {
    event.preventDefault();
    for (let active of document.getElementsByClassName("active")) {
      let firstName = active.innerText.split(' ')[0];
      let lastName = active.innerText.split(' ')[1];
      let foundPerson = persons.find(person => person.name.first.includes(firstName) && person.name.last.includes(lastName));
      setPersons(persons.filter(person => person !== foundPerson));
      
      // console.log(foundPerson);
      // setGroupA([...groupA, foundPerson]);
      active.classList.remove('active');
    }
  }

  const handleClickToGroupB = (event) => {
    event.preventDefault();
  }

  //console.log(groupA);

  return (
    <div className="App">
      <div>
        <button onClick={handleClickToGroupA}>Group A</button>
        <button onClick={handleClickToGroupB}>Group B</button>
      </div>
      <div>
        <h1>BIGMAN</h1>
        <ListGroup>
          {persons.map((person, index) => {
            return (
              <ListPerson
                index={index}
                first={person.name.first}
                last={person.name.last}
                handleClick={handleClick}
              />
            );
          })}
        </ListGroup>
      </div>
      <div>
        <h1>GroupA</h1>
        <ListGroup>
          {groupA.map((person, index) => {
            return (
              <ListPerson
                index={index}
                first={person.first}
                last={person.last}
                handleClick={handleClick}
              />
            );
          })}
        </ListGroup>
     </div>
      
      {/* <ListGroup>
        {groupB.map((person, index) => {
          <ListPerson
            index={index}
            first={person.name.first}
            last={person.name.last}
            handleClick={handleClick}
          />
        })}
      </ListGroup> */}
   </div>
  );
}

export default App;
