import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './Sidebar/Sidebar';
import TaskView from './TaskView/TaskView';
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
          <Col style={{ paddingLeft: '0', paddingRight: '0' }} xs={2}><Sidebar /></Col>
          <Col style={{ paddingLeft: '0', paddingRight: '0' }}><TaskView showAll={this.state.showAll} /></Col>
          <ShowAllCheckboxes onClick={() => this.handleClick()} />
        </Row>
      </Container>
    );
  }
}