import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function ListPerson({ index, first, last, handleClick}) {

  return (
    <ListGroup.Item onClick={(event) => handleClick(event, first, last)} key={index}>{`${first} ${last}`}</ListGroup.Item>
  );
}

export default ListPerson;
