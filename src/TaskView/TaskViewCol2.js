import React from 'react';
import './TaskViewCol.css';
import SeniorDesign from './SeniorDesign';
import InnovationAndDesign from './InnovationAndDesign';
import Row from 'react-bootstrap/Row';

export default class TaskViewCol2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='task-view-col'>
        <Row style={{padding: '1.5rem'}}>
          <SeniorDesign showAll={this.props.showAll} />
          <InnovationAndDesign showAll={this.props.showAll} />
        </Row>
      </div>
    );
  }
}