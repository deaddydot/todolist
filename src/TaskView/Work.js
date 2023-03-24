import React from 'react';
import Card from 'react-bootstrap/Card';
import Checkbox from '../Checkbox';

export default class Work extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{backgroundColor: 'var(--work)', border: 'none', padding: '1rem'}}>
        <h4 style={{margin: '1rem'}}>Work</h4>
        <Checkbox task='Finish project' showAll={this.props.showAll} />
        <Checkbox task='Prepare for migration' showAll={this.props.showAll} />
        <Checkbox task='Fix printer' showAll={this.props.showAll} />
        <Checkbox task='Fix printer' showAll={this.props.showAll} />
        <Checkbox task='Tickets, tickets, tickets' showAll={this.props.showAll} />
      </Card>
    );
  }
}