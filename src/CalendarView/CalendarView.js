import React from 'react';
import CalendarViewDataDatabase from './CalendarViewDataDatabase';

export default class CalendarView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CalendarViewDataDatabase showAll={this.props.showAll} flaskUrl={this.props.flaskUrl} userId={this.props.userId} nightMode={this.props.nightMode}/>
    );
  }
}