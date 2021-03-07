import React from 'react';
// Bootstrap
import Button from 'react-bootstrap/Button';

function AddButton({ id, handleClick, text }) {
  return (
    <>
      <Button variant="outline-success" id={id} onClick={handleClick}>{text}</Button>
    </>
  );
}

export default AddButton;