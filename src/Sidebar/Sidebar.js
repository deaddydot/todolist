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