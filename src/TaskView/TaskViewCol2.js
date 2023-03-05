import React from 'react';
import './TaskViewCol.css';
import SeniorDesign from './SeniorDesign';
import InnovationAndDesign from './InnovationAndDesign';
import Row from 'react-bootstrap/Row';

export default class TaskViewCol2 extends React.Component {
  render() {
    return (
      <div className='task-view-col'>
        <Row style={{padding: '1.5rem'}}>
          <SeniorDesign />
          <InnovationAndDesign />
        </Row>
      </div>
    );
  }
}