import React from 'react';
// Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
// Style
import './ListPerson.scss';

function ListPerson({ index, first, last, changeActive, handleRemoveClick, buttonGroup }) {
  return (
    <>
      {
        changeActive
          ? <ListGroup.Item action key={index} onClick={(event) => changeActive(event, index)}><label>{`${first} ${last}`}</label></ListGroup.Item>
          : <ListGroup.Item key={index}><label>{`${first} ${last}`}</label>
              <Button id={buttonGroup} variant="outline-danger" size="sm" onClick={(event) => handleRemoveClick(event, index)}>Remove</Button>
            </ListGroup.Item>
      }
    </>
  );
}

export default ListPerson;