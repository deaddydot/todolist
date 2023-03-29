import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './Sidebar/Sidebar';
import TaskView from './TaskView/TaskView';
import CalendarView from './CalendarView/CalendarView';
import ShowAllCheckboxes from './ShowAllCheckboxes';

const baseUrl = "http://localhost:5000"

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showAll: false, showTask: true, showCalendar: false };

    this.handleClick = this.handleClick.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  handleClick() {
    const newState = !this.state.showAll;
    this.setState({ showAll: newState, showTask: true, showCalendar: false });
  }

  changeView(view) {
    if (view === 'task') {
      this.setState({ showTask: true, showCalendar: false });
    }
    else if (view === 'calendar') {
      this.setState({ showTask: false, showCalendar: true });
    }
  }

  componentDidMount() {
    document.title = 'Tasktastic';
  }

  render() { 
    return (
      <Container fluid='true'>
        <Row>
          <Col style={{ paddingLeft: '0', paddingRight: '0' }} xs={2}><Sidebar onInput={this.changeView.bind(this)} /></Col>
          {this.state.showTask && (
            <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
              <div id='TaskView'><TaskView showAll={this.state.showAll} /></div>
            </Col>
          )}
          {this.state.showCalendar && (
            <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
              <CalendarView showAll={this.state.showAll} />
            </Col>
          )}
          <ShowAllCheckboxes onClick={() => this.handleClick()} />
        </Row>
      </Container>
    );
  }
}
