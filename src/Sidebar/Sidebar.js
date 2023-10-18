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
import Settings from "./Settings/openSettings";

function Sidebar(props) {
  function changeView(view) {
    props.onInput(view);
  }

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const sidebarStyle = {
    padding: '20px',
    backgroundColor: props.nightMode ? '#282A3A' : '#C69749', // Set background color based on nightMode
    transition: 'background-color 0.5s ease-in-out',
  };
  
  return (
    <div className='sidebar' style={sidebarStyle}>
      <Row style={{height: '10%', paddingTop: '2rem'}}>
        <h1 className='text-center'>
          <img 
            className="logo"
            src={props.nightMode ? process.env.PUBLIC_URL + '/tasktastic-dark.png' : process.env.PUBLIC_URL + '/tasktastic-light.png'} 
            alt="TaskTastic Logo" 
          />
        </h1>
      </Row>
      <Row>
      <AddTaskButton flaskUrl={props.flaskUrl} userId={props.userId} nightMode={props.nightMode} />
      <AddCategoryButton flaskUrl={props.flaskUrl} userId={props.userId} nightMode={props.nightMode} />
      <Settings flaskUrl={props.flaskUrl} userId={props.userId} nightMode={props.nightMode} />
      </Row>
      <Row>
        {/* <h2 className='text-center'>Settings</h2> */}
      </Row>
    </div>
  )
}

export default Sidebar;