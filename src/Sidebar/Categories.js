import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './Sidebar';

export default class Categories extends React.Component {
  render() {
    return (
      <div style={{borderRadius: '10px'}}>
        <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: 'var(--life)'}}><h4>Life</h4></ListGroup.Item>
        <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: 'var(--work)'}}><h4>Work</h4></ListGroup.Item>
        <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: 'var(--senior-design)'}}><h4>Senior Design</h4></ListGroup.Item>
        <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: 'var(--intro-to-computer-architecture)'}}><h4>Intro to Computer Architecture</h4></ListGroup.Item>
        <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: 'var(--innovation-and-design)'}}><h4>Innovation and Design</h4></ListGroup.Item>
        <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: 'var(--intro-to-cybersecurity)'}}><h4>Intro to Cybersecurity</h4></ListGroup.Item>
      </div>
    )
  }
}