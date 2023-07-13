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
// const flaskUrl = "https://tasktastic.link:5001"

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      showAll: false, 
      showTask: true, 
      showCalendar: false, 
      showCompleted: false, 
      view: 'task',
      userId: 0
    };

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
    document.title = 'TaskTastic';
  }

  render() { 
    return (
      <Container fluid='true'>
        <Row>
          <div style={{position: 'fixed', top: '1rem', left: '0.5rem'}}>
            <LoginButton/>
            <LogoutButton/>
          </div>
          <Col style={{ paddingLeft: '0', paddingRight: '0' }} xs={2}>
            <Sidebar onInput={this.changeView.bind(this)} flaskUrl={flaskUrl} userId={this.state.userId} />
          </Col>
          {this.state.showTask && (
            <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
              <div id='TaskView'><TaskView showAll={this.state.showAll} flaskUrl={flaskUrl} userId={this.state.userId} /></div>
            </Col>
          )}
          {this.state.showCalendar && (
            <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
              <CalendarView showAll={this.state.showAll} flaskUrl={flaskUrl} userId={this.props.userId} />
            </Col>
          )}
          {this.state.showCompleted && (
            <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
              <CompletedView showAll={this.state.showAll} flaskUrl={flaskUrl} userId={this.props.userId} />
            </Col>
          )}
          <ShowAllCheckboxes onClick={() => this.handleClick()} showAll={this.state.showAll} view={this.state.view} />
        </Row>
      </Container>
    );
  }
}