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
import Cookies from 'js-cookie';
import axios from 'axios';

// dev flask url
const flaskUrl = "http://127.0.0.1:5000";

// prod flask url
// const flaskUrl = "https://tasktastic.link:5001";

export class App extends React.Component {
  constructor(props) {
    super(props);

    const userIdCookie = Cookies.get('userId');

    this.state = { 
      showAll: false, 
      showTask: true, 
      showCalendar: false, 
      showCompleted: false, 
      view: 'task',
      userId: userIdCookie,
      isAuthenticated: false  // Added this line
    };

    this.handleClick = this.handleClick.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  async componentDidMount() {
    document.title = 'TaskTastic';
    await this.checkAuthentication();  // Added this line
  }

  // Added this method
  async checkAuthentication() {
    try {
      const response = await axios.get('http://localhost:5000/is_authenticated', { withCredentials: true });
      if (response.data.isAuthenticated) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
    } catch (error) {
      console.error('An error occurred while checking authentication:', error);
      this.setState({ isAuthenticated: false });
    }
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

  render() { 
    return (
      <Container fluid='true'>
        <Row>
          <div style={{position: 'fixed', top: '1rem', left: '0.5rem'}}>
            <LoginButton isAuthenticated={this.state.isAuthenticated} />
            <LogoutButton isAuthenticated={this.state.isAuthenticated} />
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
              <CalendarView showAll={this.state.showAll} flaskUrl={flaskUrl} userId={this.state.userId} />
            </Col>
          )}
          {this.state.showCompleted && (
            <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
              <CompletedView showAll={this.state.showAll} flaskUrl={flaskUrl} userId={this.state.userId} />
            </Col>
          )}
          <ShowAllCheckboxes onClick={() => this.handleClick()} showAll={this.state.showAll} view={this.state.view} />
        </Row>
      </Container>
    );
  }
}
