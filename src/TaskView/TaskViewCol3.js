import React from 'react';
import './TaskViewCol.css';
import IntroToComputerArchitecture from './IntroToComputerArchitecture';
import IntroToCybersecurity from './IntroToCybersecurity';
import Row from 'react-bootstrap/Row';

export default class TaskViewCol3 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='task-view-col'>
        <Row style={{padding: '1.5rem'}}>
          <IntroToComputerArchitecture showAll={this.props.showAll} />
          <IntroToCybersecurity showAll={this.props.showAll} />
        </Row>
      </div>
    );
  }
}