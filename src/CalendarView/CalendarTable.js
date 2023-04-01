import React from 'react';
import Table from 'react-bootstrap/Table';
import './CalendarTable.css';
import Checkbox from '../Checkbox';

export default class CalendarTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data, columns } = this.props;
    const numberOfRows = Math.ceil(data.length / columns);

    const tableBody = [];

    for (let row = 0; row < numberOfRows; row++) {
      const rowData = [];
      for (let col = 0; col < columns; col++) {
        const dataIndex = col * numberOfRows + row;
        rowData.push(
          <td key={`col-${col}-row-${row}-data-${dataIndex}`}>
            {dataIndex < data.length ? data[dataIndex] : ''}
          </td>
        );
      }
      tableBody.push(<tr key={`row-${row}`}>{rowData}</tr>);
    }

    return (
      <Table striped bordered hover>
        <tbody>{tableBody}</tbody>
      </Table>
    );
  }

  // render() {
  //   const tableRows = this.props.data.map((rowData, index) => {
  //     const tableCells = rowData.map((cellData, cellIndex) => {
  //       if(cellData === '') {
  //         return <td style={{ border: 'none' }}></td>
  //       }
  //       else {
  //         return <td key={cellIndex} style={{ border: 'none' }}><Checkbox task={cellData} /></td>;
  //       }
  //     });
  
  //     return <tr key={index} style={{ height: '50px', verticalAlign: 'top' }}>{tableCells}</tr>;
  //   });

  //   return (
  //     <Table style={{ backgroundColor: 'var(--tertiary-color)', height: `calc(100vh - ${2 * 16}px)` }}>
  //       <thead>
  //         <th><h4>Sunday</h4></th>
  //         <th><h4>Monday</h4></th>
  //         <th><h4>Tuesday</h4></th>
  //         <th><h4>Wednesday</h4></th>
  //         <th><h4>Thursday</h4></th>
  //         <th><h4>Friday</h4></th>
  //         <th><h4>Saturday</h4></th>
  //       </thead>
  //       <tbody>
  //         {tableRows}
  //       </tbody>
  //     </Table>
  //   );
  // }
}