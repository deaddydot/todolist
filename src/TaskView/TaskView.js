import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TaskViewCol1 from './TaskViewCol1';
import TaskViewCol2 from './TaskViewCol2';
import TaskViewCol3 from './TaskViewCol3';
import TaskViewData from './TaskViewData';
import TaskViewDataDatabase from './TaskViewDataDatabase';

export default class TaskView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TaskViewDataDatabase showAll={this.props.showAll} flaskUrl={this.props.flaskUrl} userId={this.props.userId} nightMode={this.props.nightMode}/>
    );
  }
}