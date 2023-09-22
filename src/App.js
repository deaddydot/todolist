import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row, Card, Form, Button } from 'react-bootstrap';
import Sidebar from './Sidebar/Sidebar';
import TaskView from './TaskView/TaskView';
import CalendarView from './CalendarView/CalendarView';
import CompletedView from './CompletedView/CompletedView';
import LoginButton from './authentication/LoginButton';
import LogoutButton from './authentication/LogoutButton';
import Cookies from 'js-cookie';
import axios from 'axios';
  
export const NightModeContext = React.createContext();
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
      isAuthenticated: false,
      categories: [],
      nightMode: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.changeView = this.changeView.bind(this);
    this.toggleNightMode = this.toggleNightMode.bind(this);
  }

  async componentDidMount() {
    document.title = 'TaskTastic';
    await this.checkAuthentication();
  }

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

  updateCategories = (newCategories) => {
    this.setState({ categories: newCategories });
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

  toggleNightMode() {
    const currentNightMode = this.state.nightMode;
    this.setState({ nightMode: !currentNightMode }, () => {
      if (this.state.nightMode) {
        document.body.classList.add('night-mode');
      } else {
        document.body.classList.remove('night-mode');
      }
    });
  }

  render() {
    const appStyle = 
    {backgroundColor: this.state.nightMode ? 'black' : 'white',
    color: this.state.nightMode ? 'white' : 'black',
    transition: 'background-color 0.5s ease-in-out',
    };

    return (
      <div style={{ ...appStyle, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container fluid='true' style={{ ...appStyle, flex: '1' }}>
          <Row style={appStyle}>
            <Col style={{ ...appStyle, paddingLeft: '0', paddingRight: '0' }} xs={2}>
              <Sidebar onInput={this.changeView.bind(this)} flaskUrl={flaskUrl} userId={this.state.userId} updateCategories={this.updateCategories} nightMode={this.state.nightMode}/>
            </Col>
            <Col style={{ ...appStyle, paddingLeft: '0', paddingRight: '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                <Button onClick={this.toggleNightMode}>
                  Toggle Night Mode
                </Button>
                <div>
                  <Button style={{ backgroundColor: 'lightgreen', border: 'none', color: 'black' }} onClick={() => this.changeView('task')}>
                    Categories
                  </Button>
                  <Button style={{ backgroundColor: 'violet', border: 'none', color: 'black', marginLeft: '0.5rem' }} onClick={() => this.changeView('calendar')}>
                    Calendar
                  </Button>
                  <Button style={{ backgroundColor: 'yellow', border: 'none', color: 'black', marginLeft: '0.5rem' }} onClick={() => this.changeView('completed')}>
                    Completed
                  </Button>
                </div>
                <div>
                  <LoginButton isAuthenticated={this.state.isAuthenticated} />
                  <LogoutButton isAuthenticated={this.state.isAuthenticated} />
                </div>
              </div>
              {this.state.showTask && <div id='TaskView' style={appStyle}><TaskView showAll={this.state.showAll} flaskUrl={flaskUrl} userId={this.state.userId} nightMode={this.state.nightMode}/></div>}
              {this.state.showCalendar && <CalendarView style={appStyle} showAll={this.state.showAll} flaskUrl={flaskUrl} userId={this.state.userId} nightMode={this.state.nightMode} />}
              {this.state.showCompleted && <CompletedView style={appStyle} showAll={this.state.showAll} flaskUrl={flaskUrl} userId={this.state.userId} nightMode={this.state.nightMode} />}      
            </Col>
          </Row>
        </Container>
        <NightModeContext.Provider value={this.state.nightMode}>
        {/* Other components */}
      </NightModeContext.Provider>
      </div>
      
    );
}
}
