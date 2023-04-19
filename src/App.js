import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './Sidebar/Sidebar';
import TaskView from './TaskView/TaskView';
import CalendarView from './CalendarView/CalendarView';
import CompletedView from './CompletedView/CompletedView';
import ShowAllCheckboxes from './ShowAllCheckboxes';
import LoginButton from './authentication/LoginButton';
import LogoutButton from './authentication/LogoutButton';


// dev flask url
const flaskUrl = "http://127.0.0.1:5000"

// prod flask url
// const flaskUrl = "http://3.82.154.110:5000"

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showAll: false, showTask: true, showCalendar: false, showCompleted: false, view: 'task' };

    this.handleClick = this.handleClick.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  handleClick() {
    const newState = !this.state.showAll;
    this.setState({ showAll: newState });
  }

  changeView(view) {
    this.setState({ showAll: false });
    if (view === 'task') {
      this.setState({ showTask: true, showCalendar: false, showCompleted: false, view: 'task' });
    }
    else if (view === 'calendar') {
      this.setState({ showTask: false, showCalendar: true, showCompleted: false, view: 'calendar' });
    }
    else if (view === 'completed') {
      this.setState({ showTask: false, showCalendar: false, showCompleted: true, view: 'completed' });
    }
  }

  componentDidMount() {
    document.title = 'Tasktastic';
  }

  render() { 
    return (
      <Container fluid='true'>
        <Row>
          <h1>
            <LoginButton/>
            <LogoutButton/>
          </h1>
          <Col style={{ paddingLeft: '0', paddingRight: '0' }} xs={2}><Sidebar onInput={this.changeView.bind(this)} flaskUrl={flaskUrl} /></Col>
          {this.state.showTask && (
            <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
              <div id='TaskView'><TaskView showAll={this.state.showAll} flaskUrl={flaskUrl} /></div>
            </Col>
          )}
          {this.state.showCalendar && (
            <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
              <CalendarView showAll={this.state.showAll} flaskUrl={flaskUrl} />
            </Col>
          )}
          {this.state.showCompleted && (
            <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
              <CompletedView showAll={this.state.showAll} flaskUrl={flaskUrl} />
            </Col>
          )}
          <ShowAllCheckboxes onClick={() => this.handleClick()} showAll={this.state.showAll} view={this.state.view} />
        </Row>
      </Container>
    );
  }
}