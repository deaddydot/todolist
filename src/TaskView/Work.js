import React from 'react';
import Card from 'react-bootstrap/Card';
import Checkbox from './Checkbox';

export default class Work extends React.Component {
  render() {
    return (
      <Card style={{backgroundColor: 'var(--work)', border: 'none', padding: '1rem'}}>
        <h4 style={{margin: '1rem'}}>Work</h4>
        <Checkbox task='Finish project' />
        <Checkbox task='Prepare for migration' />
        <Checkbox task='Fix printer' />
        <Checkbox task='Fix printer' />
        <Checkbox task='Tickets, tickets, tickets' />
      </Card>
    );
  }
}