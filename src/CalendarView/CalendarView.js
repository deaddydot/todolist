import React from 'react';
import Row from 'react-bootstrap/Row';
import CalendarTable from './CalendarTable';
import CalendarViewData from './CalendarViewData';

export default class CalendarView extends React.Component {

  render() {
    return (
      <CalendarViewData showAll={this.props.showAll} />
    );
  }
}

//   render() {
//     const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
//     const columns = 3;

//     return (
//       <div className="App">
//         <h1>Month</h1>
//         <CalendarTable data={data} columns={columns} />
//       </div>
//     );
//   }
// }