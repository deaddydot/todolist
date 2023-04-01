import React from 'react';
import Card from 'react-bootstrap/Card';
import DataFromJson from './TaskViewData';

export default class SeniorDesign extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DataFromJson />
    );
  }
}