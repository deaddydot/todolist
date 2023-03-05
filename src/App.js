import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './Sidebar/Sidebar';
import TaskViewCol1 from './TaskView/TaskViewCol1';
import TaskViewCol2 from './TaskView/TaskViewCol2';
import TaskViewCol3 from './TaskView/TaskViewCol3';
import ShowAllCheckboxes from './ShowAllCheckboxes';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showAll: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const newState = !this.state.showAll;
    this.setState({ showAll: newState });
  }

  componentDidMount() {
    document.title = 'Tasktastic';
  }

  render() { 
    return (
      <Container fluid='true'>
        <Row>
          <Col style={{ paddingLeft: '0', paddingRight: '0' }}><Sidebar /></Col>
          <Col style={{ paddingLeft: '0', paddingRight: '0' }}><TaskViewCol1 showAll={this.state.showAll} /></Col>
          <Col style={{ paddingLeft: '0', paddingRight: '0' }}><TaskViewCol2 showAll={this.state.showAll} /></Col>
          <Col style={{ paddingLeft: '0', paddingRight: '0' }}><TaskViewCol3 showAll={this.state.showAll} /></Col>
          <ShowAllCheckboxes onClick={() => this.handleClick()} />
        </Row>
      </Container>
    );
  }
}