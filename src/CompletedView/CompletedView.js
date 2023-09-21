import React from 'react';
import Row from 'react-bootstrap/Row';
import CompletedViewDataDatabase from './CompletedViewDataDatabase';

export default class CompletedView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <CompletedViewDataDatabase showAll={this.props.showAll} flaskUrl={this.props.flaskUrl} userId={this.props.userId} nightMode={this.props.nightMode}/>
      </Row> 
    );
  }
}