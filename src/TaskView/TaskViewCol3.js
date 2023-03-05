import React from 'react';
import './TaskViewCol.css';
import IntroToComputerArchitecture from './IntroToComputerArchitecture';
import IntroToCybersecurity from './IntroToCybersecurity';
import Row from 'react-bootstrap/Row';

export default class TaskViewCol3 extends React.Component {
  render() {
    return (
      <div className='task-view-col'>
        <Row style={{padding: '1.5rem'}}>
          <IntroToComputerArchitecture />
          <IntroToCybersecurity />
        </Row>
      </div>
    );
  }
}