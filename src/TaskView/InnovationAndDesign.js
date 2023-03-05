import React from 'react';
import Card from 'react-bootstrap/Card';
import Checkbox from './Checkbox';

export default class InnovationAndDesign extends React.Component {
  render() {
    return (
      <Card style={{backgroundColor: 'var(--innovation-and-design)', border: 'none', padding: '1rem'}}>
        <h4 style={{margin: '1rem'}}>Innovation and Design</h4>
          <Checkbox task='Innovate' />
          <Checkbox task='Gather materials' />
          <Checkbox task='Build prototype' />
          <Checkbox task='Present project' />
          <Checkbox task='Expand upon prototype' />
          <Checkbox task='Enter competition' />
      </Card>
    );
  }
}