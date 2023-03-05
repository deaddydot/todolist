import React from 'react';
import Card from 'react-bootstrap/Card';
import Checkbox from './Checkbox';

export default class InnovationAndDesign extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{backgroundColor: 'var(--innovation-and-design)', border: 'none', padding: '1rem'}}>
        <h4 style={{margin: '1rem'}}>Innovation and Design</h4>
          <Checkbox task='Innovate' showAll={this.props.showAll} />
          <Checkbox task='Gather materials' showAll={this.props.showAll} />
          <Checkbox task='Build prototype' showAll={this.props.showAll} />
          <Checkbox task='Present project' showAll={this.props.showAll} />
          <Checkbox task='Expand upon prototype' showAll={this.props.showAll} />
          <Checkbox task='Enter competition' showAll={this.props.showAll} />
      </Card>
    );
  }
}