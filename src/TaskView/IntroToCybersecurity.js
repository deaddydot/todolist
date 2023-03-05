import React from 'react';
import Card from 'react-bootstrap/Card';
import Checkbox from './Checkbox';

export default class IntroToCybersecurity extends React.Component {
  render() {
    return (
      <Card style={{backgroundColor: 'var(--intro-to-cybersecurity)', border: 'none', padding: '1rem'}}>
        <h4 style={{margin: '1rem'}}>Intro to Cybersecurity</h4>
          <Checkbox task='Homework' />
          <Checkbox task='Lab' />
          <Checkbox task='Lectures' />
          <Checkbox task='Study' />
          <Checkbox task='Do the things you were assigned' />
      </Card>
    );
  }
}