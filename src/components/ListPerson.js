import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function ListPerson({ index, first, last, handleClick}) {

  return (
    <ListGroup.Item onClick={handleClick} key={index}>{`${first} ${last}`}</ListGroup.Item>
  );
}

export default ListPerson;
