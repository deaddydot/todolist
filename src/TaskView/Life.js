import React from 'react';
import Card from 'react-bootstrap/Card';
import Checkbox from './Checkbox';

export default class Life extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{backgroundColor: 'var(--life)', border: 'none', padding: '1rem'}}>
        <h4 style={{margin: '1rem'}}>Life</h4>
        <Checkbox task='Go to gym' showAll={this.props.showAll} />
        <Checkbox task='Dr. appointment' showAll={this.props.showAll} />
        <Checkbox task='Play games' showAll={this.props.showAll} />
        <Checkbox task='Work on project' showAll={this.props.showAll} />
        <Checkbox task='Get groceries' showAll={this.props.showAll} />
      </Card>
    );
  }
}