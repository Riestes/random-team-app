import React, { useState, useEffect } from 'react';
import ListPerson from './components/ListPerson';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'

import './App.css';

function App() {

  // How many users to fetch
  const userCount = 20;
  
  const [persons, setPersons] = useState([]);
  const [groupA, setGroupOne] = useState([]);
  const [groupB, setGroupTwo] = useState([]);

  // Get all all data from data service
  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?inc=name&noinfo&results=${userCount}`)
      .then(response => {
        setPersons(response.data.results)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('active')) {
      event.target.classList.remove('active');
    } else {
      event.target.classList.add('active');
    }
  }

  const handleClickToGroupA = (event) => {
    event.preventDefault();
    console.log(persons);
    let arr = document.getElementsByClassName("active");

    for (let i = 0; i < arr.length; i++) {
      console.log(document.getElementsByClassName('active')[i].innerText);
    }
    
    if (document.getElementsByClassName('active')) {
      
    }
    console.log('Clicked to group A');
  }

  const handleClickToGroupB = (event) => {
    event.preventDefault();
    console.log('Clicked to group B');
  }

  return (
    <div className="App">
      <h1>Hello Perttu and Antti</h1>
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
      <div>
        <button onClick={handleClickToGroupA}>Group A</button>
        <button onClick={handleClickToGroupB}>Group B</button>
      </div>
   </div>
  );
}

export default App;
