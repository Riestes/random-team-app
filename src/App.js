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

  const handleClick = (event, first, last) => {
    event.preventDefault();

    let newName = {
      'first': first,
      'last': last
    }

    setGroupA(groupA.concat(newName));

    if (event.target.classList.contains('active')) {
      event.target.classList.remove('active');
    } else {
      event.target.classList.add('active');
    }
  }

  /* const handleClickToGroupA = (event) => {
    event.preventDefault();
    
    let actives = document.getElementsByClassName("active");
    console.log(actives);

    if (document.getElementsByClassName('active')) {
      
    }
    
  } */

  /* const handleClickToGroupB = (event) => {
    event.preventDefault();
  } */

  console.log(groupA);

  return (
    <div className="App">
      {/* <div>
        <button onClick={handleClickToGroupA}>Group A</button>
        <button onClick={handleClickToGroupB}>Group B</button>
      </div> */}
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
