import React from 'react';
import Card from 'react-bootstrap/Card';
import Checkbox from './Checkbox';

export default class SeniorDesign extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{backgroundColor: 'var(--senior-design)', border: 'none', padding: '1rem'}}>
        <h4 style={{margin: '1rem'}}>Senior Design</h4>
        <Checkbox task='Meet with advisor' showAll={this.props.showAll} />
        <Checkbox task='Meet with potential customers' showAll={this.props.showAll} />
        <Checkbox task='Implement!' showAll={this.props.showAll} />
        <Checkbox task='Present in class' showAll={this.props.showAll} />
      </Card>
    );
  }
}