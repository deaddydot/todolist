import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './Sidebar/Sidebar';
import TaskView from './TaskView/TaskView';
import CalendarView from './CalendarView/CalendarView';
import ShowAllCheckboxes from './ShowAllCheckboxes';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showAll: false, showTask: true, showCalendar: false, view: 'task' };

    this.handleClick = this.handleClick.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  handleClick() {
    const newState = !this.state.showAll;
    this.setState({ showAll: newState });
  }

  changeView(view) {
    if (view === 'task') {
      this.setState({ showTask: true, showCalendar: false, view: 'task' });
    }
    else if (view === 'calendar') {
      this.setState({ showTask: false, showCalendar: true, view: 'calendar' });
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
