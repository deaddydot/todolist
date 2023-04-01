import React from 'react';
import Row from 'react-bootstrap/Row';
import CalendarTable from './CalendarTable';

export default class CalendarView extends React.Component {
  render() {
    const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const columns = 7;

    return (
      <div className="App">
        <h1>Month</h1>
        <CalendarTable data={data} columns={columns} />
      </div>
    );
  }
}