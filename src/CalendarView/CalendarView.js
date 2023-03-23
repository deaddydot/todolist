import React from 'react';
import Row from 'react-bootstrap/Row';

export default class CalendarView extends React.Component {
  render() {
    return (
      <Row style={{height: '100vh'}}>
        <p style={{backgroundColor: 'var(--secondary-color)'}}>Hello there!</p>
      </Row>
    );
  }
}