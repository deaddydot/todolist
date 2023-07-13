import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Categories from './Categories';
import Timeframes from './Timeframes';
import './Sidebar.css';
import './../index.css';
import AddTaskButton from './AddTask/addTaskButton';
import AddCategoryButton from './AddCategory/addCategoryButton';

function Sidebar(props) {
  function changeView(view) {
    props.onInput(view);
  }

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  return (
    <div className='sidebar' style={{padding: '20px'}}>
      <Row style={{height: '10%', paddingTop: '2rem'}}>
        <h1 className='text-center'>TaskTastic</h1>
      </Row>
      <Row>
        <ListGroup>
          <Button style={{width: '100%', backgroundColor: 'var(--primary-color)', border: 'none', color: 'black'}} onClick={() => setOpen(!open)} aria-controls='collapse1' aria-expanded={open}>
            <h2>Views</h2>
          </Button>
          <Collapse in={open}>
            <div id='collapse1' style={{margin: '10px', borderRadius: '10px'}}>
                <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: 'lightgreen', padding: '0', margin: '0'}}>
                  <Button style={{width: '100%', backgroundColor: 'lightgreen', border: 'none', color: 'black'}} onClick={() => changeView('task')}>
                    <h4>Categories</h4>
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: 'violet', padding: '0', margin: '0'}}>
                  <Button style={{width: '100%', backgroundColor: 'violet', border: 'none', color: 'black'}} onClick={() => changeView('calendar')}>
                    <h4>Calendar</h4>
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: 'yellow', padding: '0', margin: '0'}}>
                  <Button style={{width: '100%', backgroundColor: 'yellow', border: 'none', color: 'black'}} onClick={() => changeView('completed')} >
                    <h4>Completed</h4>
                  </Button>
                </ListGroup.Item>
            </div>
          </Collapse>
        </ListGroup>
      </Row>
      <Row>
        <ListGroup>
          <Button style={{width: '100%', backgroundColor: 'var(--primary-color)', border: 'none', color: 'black'}} onClick={() => setOpen2(!open2)} aria-controls='collapse2' aria-expanded={open2}>
            <h2>Filter by Categories</h2>
          </Button>
          <Collapse in={open2}>
            <div id='collapse2' style={{margin: '10px', borderRadius: '10px'}}>
              <Categories flaskUrl={props.flaskUrl} userId={props.userId} />
            </div>
          </Collapse>
        </ListGroup>
      </Row>
      <Row>
        <ListGroup>
          <Button style={{width: '100%', backgroundColor: 'var(--primary-color)', border: 'none', color: 'black'}} onClick={() => setOpen3(!open3)} aria-controls='collapse3' aria-expanded={open3}>
            <h2>Filter by Timeframe</h2>
          </Button>
          <Collapse in={open3}>
            <div id='collapse3' style={{margin: '10px', borderRadius: '10px'}}>
              <Timeframes />
            </div>
          </Collapse>
        </ListGroup>
      </Row>
      <Row>
        <AddTaskButton flaskUrl={props.flaskUrl} userId={props.userId} />
        <AddCategoryButton flaskUrl={props.flaskUrl} userId={props.userId} />
      </Row>
      <Row>
        <h2 className='text-center'>Settings</h2>
      </Row>
    </div>
  )
}

export default Sidebar;