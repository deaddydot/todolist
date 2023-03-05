import React from 'react';
import Card from 'react-bootstrap/Card';
import Checkbox from './Checkbox';

export default class SeniorDesign extends React.Component {
  render() {
    return (
      <Card style={{backgroundColor: 'var(--senior-design)', border: 'none', padding: '1rem'}}>
        <h4 style={{margin: '1rem'}}>Senior Design</h4>
        <Checkbox task='Meet with advisor' />
        <Checkbox task='Meet with potential customers' />
        <Checkbox task='Implement!' />
        <Checkbox task='Present in class' />
      </Card>
    );
  }
}