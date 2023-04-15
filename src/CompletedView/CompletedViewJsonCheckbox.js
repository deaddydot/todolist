import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default class CompletedViewJsonCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked
    };
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  async changeDisplay(event) {
    const newState = event.target.checked;
    this.setState({ checked: newState });

    // Make an API request to toggle the completed status of the task
    const taskId = this.props.taskId;
    const completed = newState;
    try {
      await axios.put(`${this.props.flaskUrl}/tasks/${taskId}`, { completed });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const display = this.props.showAll || this.state.checked ? 'block' : 'none';
    return (
      <div style={{ display }}>
        <Form.Check
          className='checkbox'
          type='checkbox'
          label={this.props.label}
          defaultChecked={this.props.checked}
          onChange={(event) => this.changeDisplay(event)}
        />
        <p>Due: {this.props.deadline}</p>
      </div>
    );
  }
}
