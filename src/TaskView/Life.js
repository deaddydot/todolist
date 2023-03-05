import React from 'react';
import Card from 'react-bootstrap/Card';
import Checkbox from './Checkbox';

export default class Life extends React.Component {
  render() {
    return (
      <Card style={{backgroundColor: 'var(--life)', border: 'none', padding: '1rem'}}>
        <h4 style={{margin: '1rem'}}>Life</h4>
        <Checkbox task='Go to gym' />
        <Checkbox task='Dr. appointment' />
        <Checkbox task='Play games' />
        <Checkbox task='Work on project' />
        <Checkbox task='Get groceries' />
      </Card>
    );
  }
}