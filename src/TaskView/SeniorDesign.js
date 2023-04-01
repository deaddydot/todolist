import React from 'react';
import Card from 'react-bootstrap/Card';
import DataFromJson from '../DataFromJson';

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