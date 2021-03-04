import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './ListPerson.scss';

function ListPerson({ index, first, last, changeActive, handleRemoveClick, buttonGroup }) {

  const handleClicking = (event, index) => {
    changeActive(event, index);
  }

  return (
    <>
      {
        changeActive
          ? <ListGroup.Item action key={index} onClick={(event) => handleClicking(event, index)}><label>{`${first} ${last}`}</label></ListGroup.Item>
          : <ListGroup.Item key={index}><label>{`${first} ${last}`}</label>
            <Button id={buttonGroup} variant="outline-danger" size="sm" onClick={(event) => handleRemoveClick(event, index)}>Remove</Button>
            </ListGroup.Item>
      }
    </>
     
  );
}

export default ListPerson;
