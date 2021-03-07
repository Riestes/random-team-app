import React from 'react';
//Bootstrap
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
//Components
import ListPerson from './ListPerson';
import AddButton from './buttons/AddButton';
//Styles
import './GroupColumn.scss';

function GroupColumn({ heading, array, handleRemoveClick, handleClickToGroup, changeActive, activeIndexes, buttonGroup }) {
  return (
    <>
      {handleClickToGroup && array &&
        <Col xs={12} lg={4}>
        <div className="inner-col" >
          <div className="heading">
            <h4>{heading}</h4>
            <Badge pill variant="info">{array.length}</Badge>
          </div>
           
            <ListGroup>
              {array.map((person, index) => {
                return (
                  <ListPerson
                    key={index}
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
            <AddButton id="a-btn" handleClick={(event) => handleClickToGroup(event, activeIndexes)} text="Move to Group A" />
            <AddButton id="b-btn" handleClick={(event) => handleClickToGroup(event, activeIndexes)} text="Move to Group B" />
          </div>
        </Col>
      }
      {!handleClickToGroup && array &&
        <Col xs={12} sm={6} lg={4}>
        <div className="inner-col">
          <div className="heading">
            <h4>{heading}</h4>
            <Badge pill variant="info">{array.length}</Badge>
          </div>
            <ListGroup>
              {array.map((person, index) => {
                return (
                  <ListPerson
                    key={index}
                    index={index}
                    first={person.name.first}
                    last={person.name.last}
                    handleRemoveClick={handleRemoveClick}
                    buttonGroup={buttonGroup}
                  />
                );
              })}
            </ListGroup>
          </div>
        </Col>
      }
    </>
  );
}

export default GroupColumn;