import React from 'react';
import Row from 'react-bootstrap/Row';
import CalendarTable from './CalendarTable';

export default class CalendarView extends React.Component {
  render() {
    return (
      <Row style={{ backgroundColor: 'var(--secondary-color)', minHeight: '100vh' }}>
        <h1 style={{ fontSize: '2rem', margin: '1rem 0' }}>March 5-11, 2023</h1>
        <div style={{ height: `calc(100vh - ${2 * 16}px)`}}>
          <CalendarTable data={[ ['Clean', 'Attend Class', 'Present at work', 'Test day', 'Project check', '', 'Relax'], ['', '', 'Cook for family', '', 'Mow the lawn'], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] ]} />
        </div>
      </Row>
    );
  }
}