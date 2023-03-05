import React from 'react';
import Card from 'react-bootstrap/Card';
import Checkbox from './Checkbox';

export default class IntroToComputerArchitecture extends React.Component {
  render() {
    return (
      <Card style={{backgroundColor: 'var(--intro-to-computer-architecture)', border: 'none', padding: '1rem'}}>
        <h4 style={{margin: '1rem'}}>Intro to Computer Architecture</h4>
          <Checkbox task='Homework' />
          <Checkbox task='Study for test' />
          <Checkbox task='Study for quiz' />
      </Card>
    );
  }
}