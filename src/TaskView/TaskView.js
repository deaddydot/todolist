import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TaskViewCol1 from './TaskViewCol1';
import TaskViewCol2 from './TaskViewCol2';
import TaskViewCol3 from './TaskViewCol3';

export default class TaskView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col style={{ paddingLeft: '0', paddingRight: '0' }}><TaskViewCol1 showAll={this.props.showAll} /></Col>
        <Col style={{ paddingLeft: '0', paddingRight: '0' }}><TaskViewCol2 showAll={this.props.showAll} /></Col>
        <Col style={{ paddingLeft: '0', paddingRight: '0' }}><TaskViewCol3 showAll={this.props.showAll} /></Col>
      </Row>
    );
  }
}