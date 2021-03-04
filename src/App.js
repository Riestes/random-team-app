import React, { useState, useEffect } from 'react';
import ListPerson from './components/ListPerson';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import './App.scss';

function App() {

  // How many users to fetch from API
  const userCount = 20;

  const [persons, setPersons] = useState([]);
  const [groupA, setGroupA] = useState([]);
  const [groupB, setGroupB] = useState([]);
  const [activeIndexes, setActiveIndexes] = useState([]);

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

  // Change active state of list item when clicked
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
    activeIndexes.map(i => {
      let found = persons[i];
      foundPersons.push(found);
    });
    setActiveIndexes(activeIndexes = []);
    // Filter persons list
    setPersons(persons.filter(person => !foundPersons.includes(person)));

    // Remove active classes
    let actives = document.getElementsByClassName('active');
    while (actives.length > 0) {
      actives[0].classList.remove('active');
    }
    event.target.id === 'a-btn' ? setGroupA(groupA.concat(foundPersons)) : setGroupB(groupB.concat(foundPersons));
  }

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

  return (
    <Container className="App">
      <h1>Teams app</h1>
      <Row>
        <Col xs={12} lg={4}>
          <div className="inner-col">
            <h4>Persons</h4>
            <ListGroup className="list-group">
              {persons.map((person, index) => {
                return (
                  <ListPerson
                    index={index}
                    first={person.name.first}
                    last={person.name.last}
                    changeActive={changeActive}
                  />
                );
              })}
            </ListGroup>
          </div>
          <div className="btn-group">
            <Button variant="outline-success" id="a-btn" onClick={(event) => handleClickToGroup(event, activeIndexes)}>Move to Group A</Button>
            <Button variant="outline-success" id="b-btn" onClick={(event) => handleClickToGroup(event, activeIndexes)}>Move to Group B</Button>
          </div>
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <div className="inner-col">
            <h4>Group A</h4>
            <ListGroup className="list-group">
              {groupA.map((person, index) => {
                return (
                  <ListPerson
                    index={index}
                    first={person.name.first}
                    last={person.name.last}
                    handleRemoveClick={handleRemoveClick}
                    buttonGroup={'a-group'}
                  />
                );
              })}
            </ListGroup>
          </div>
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <div className="inner-col">
            <h4>Group B</h4>
            <ListGroup className="list-group">
              {groupB.map((person, index) => {
                return (
                  <ListPerson
                    index={index}
                    first={person.name.first}
                    last={person.name.last}
                    handleRemoveClick={handleRemoveClick}
                    buttonGroup={'b-group'}
                  />
                );
              })}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
