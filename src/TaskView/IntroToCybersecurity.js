import React from 'react';
import Card from 'react-bootstrap/Card';
import Checkbox from '../Checkbox';

export default class IntroToCybersecurity extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{backgroundColor: 'var(--intro-to-cybersecurity)', border: 'none', padding: '1rem'}}>
        <h4 style={{margin: '1rem'}}>Intro to Cybersecurity</h4>
          <Checkbox task='Homework' showAll={this.props.showAll} />
          <Checkbox task='Lab' showAll={this.props.showAll} />
          <Checkbox task='Lectures' showAll={this.props.showAll} />
          <Checkbox task='Study' showAll={this.props.showAll} />
          <Checkbox task='Do the things you were assigned' showAll={this.props.showAll} />
      </Card>
    );
  }
}