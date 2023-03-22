import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default class Categories extends React.Component {
  render() {
    return (
      <div style={{borderRadius: '10px'}}>
        <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: 'var(--secondary-color)'}}><h4>Month</h4></ListGroup.Item>
        <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: 'var(--secondary-color)'}}><h4>Week</h4></ListGroup.Item>
        <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: 'var(--secondary-color)'}}><h4>Day</h4></ListGroup.Item>
      </div>
    )
  }
}