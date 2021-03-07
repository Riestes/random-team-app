import React, { useState, useEffect } from 'react';
import axios from 'axios';
//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
//Styles
import './App.scss';
//Components
import GroupColumn from './components/GroupColumn';

function App() {
  // How many users to fetch from API
  const userCount = 20;

  const [persons, setPersons] = useState([]);
  const [groupA, setGroupA] = useState([]);
  const [groupB, setGroupB] = useState([]);
  const [activeIndexes, setActiveIndexes] = useState([]);

  // Helper function axios get request
  const getNames = () => {
    axios.get(`https://randomuser.me/api/?inc=name&noinfo&results=${userCount}`)
      .then(response => {
        setPersons(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Uses local storage for arrays
  useEffect(() => {
    if (localStorage.getItem("personsData")) {
      setPersons(JSON.parse(localStorage.getItem("personsData")));
    }
    if (localStorage.getItem("groupAData")) {
      setGroupA(JSON.parse(localStorage.getItem("groupAData")));
    }
    if (localStorage.getItem("groupBData")) {
      setGroupB(JSON.parse(localStorage.getItem("groupBData")));
    } else {

    }
  }, []);

  useEffect(() => {
    localStorage.setItem("groupAData", JSON.stringify(groupA));
    localStorage.setItem("groupBData", JSON.stringify(groupB));
    localStorage.setItem("personsData", JSON.stringify(persons));
  }, [groupA, groupB, persons])

  // Change active state of list item when clicked
  // Manipulates activeIndexes list as clicks occurs
  const changeActive = (event, index) => {
    event.preventDefault();
    setActiveIndexes(activeIndexes.includes(index) ? activeIndexes.filter(i => i !== index) : activeIndexes.concat(index));
    event.target.classList.contains('active') ? event.target.classList.remove('active') : event.target.classList.add('active');
  }

  // Handle Click to Group A Or Group B
  const handleClickToGroup = (event, activeIndexes) => {
    event.preventDefault();
    // Find similar indexes
    let foundPersons = [];
    activeIndexes.forEach(i => {
      let found = persons[i];
      foundPersons.push(found);
    });
    setActiveIndexes(activeIndexes = []);
    // Filter persons list
    setPersons(persons.filter(person => !foundPersons.includes(person)));
    // Remove all active classes
    let actives = document.getElementsByClassName('active');
    while (actives.length > 0) {
      actives[0].classList.remove('active');
    }
    // concat to group A or B based on button id
    event.target.id === 'a-btn' ? setGroupA(groupA.concat(foundPersons)) : setGroupB(groupB.concat(foundPersons));
  }

  // Filter from groupA or groupB and concat to persons
  const handleRemoveClick = (event, index) => {
    event.preventDefault();
    let selectedPerson = [];
    if (event.target.id === 'a-group') {
      selectedPerson = groupA[index];
      setGroupA(groupA.filter(person => person !== selectedPerson));
    } else {
      selectedPerson = groupB[index];
      setGroupB(groupB.filter(person => person !== selectedPerson));
    }
    setPersons(persons.concat(selectedPerson));
  }

  // Handles clear person data and load new list of names
  const handleClearAllClick = (event) => {
    event.preventDefault();
    let text = event.target.innerText;
    if (text === 'Clear person data') {
      if (window.confirm("Are you sure? This removes all data and loads new person list.")) {
        // Clear local storage just in case
        localStorage.clear();
        // Clear all arrays
        setPersons([]);
        setGroupA([]);
        setGroupB([]);
        //Get new names
        getNames();
      } 
    } else {
      //Get new names
      getNames();
    }
  }

  return (
    <Container className="App">
      <h1>Grouping app</h1>
      {persons.length !== 0 || groupA.length !== 0 || groupB.length !== 0
        ? <Button size="sm" block variant="outline-danger" onClick={handleClearAllClick}>Clear person data</Button>
        : <Button size="sm" block variant="outline-success" onClick={handleClearAllClick}>Get persons</Button>
      }
      
      {persons.length !== 0 || groupA.length !== 0 || groupB.length !== 0 ?
        <Row>
          <GroupColumn heading="Persons" array={persons} handleClickToGroup={handleClickToGroup} changeActive={changeActive} activeIndexes={activeIndexes} />
          <GroupColumn heading="Group A" array={groupA} handleRemoveClick={handleRemoveClick} buttonGroup="a-group" />
          <GroupColumn heading="Group B" array={groupB} handleRemoveClick={handleRemoveClick} buttonGroup="b-group" />
        </Row>
        :
        <></>
      }
    </Container>
  );
}

export default App;