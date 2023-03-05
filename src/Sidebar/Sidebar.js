import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Categories from './Categories';
import './Sidebar.css';
import './../index.css';

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div className='sidebar' style={{paddingLeft: '20px'}}>
      <Row style={{height: '10%', alignContent: 'center'}}>
        <h1 className='text-center'>Tasktastic</h1>
      </Row>
      <Row>
        <ListGroup>
          <Button style={{width: '100%', backgroundColor: 'var(--primary-color)', border: 'none', color: 'black'}} onClick={() => setOpen(!open)} aria-controls='collapse1' aria-expanded={open}>
            <h2>Views</h2>
          </Button>
          <Collapse in={open}>
            <div id='collapse1' style={{margin: '10px', borderRadius: '10px'}}>
                <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: 'var(--secondary-color)'}}><h4>Categories</h4></ListGroup.Item>
                <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: 'var(--secondary-color)'}}><h4>Calendar</h4></ListGroup.Item>
            </div>
          </Collapse>
        </ListGroup>
        <ListGroup>
          <Button style={{width: '100%', backgroundColor: 'var(--primary-color)', border: 'none', color: 'black'}} onClick={() => setOpen2(!open2)} aria-controls='collapse2' aria-expanded={open2}>
            <h2>Filter by Categories</h2>
          </Button>
          <Collapse in={open2}>
            <div id='collapse2' style={{margin: '10px', borderRadius: '10px'}}>
              <Categories />
            </div>
          </Collapse>
        </ListGroup>
      </Row>
      <Row>
        <h2 className='text-center'>Add a task</h2>
      </Row>
      <Row>
        <h2 className='text-center'>Settings</h2>
      </Row>
    </div>
  )
}

export default Sidebar;