import React from 'react';
import Form from 'react-bootstrap/Form'
import axios from 'axios';

export default class JsonCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      display: 'block',
      checked: false
    };
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showAll !== this.props.showAll) {
      if (this.props.showAll) {
        this.setState({ display: 'block' });
      }
      else if (!this.props.showAll && this.state.checked) {
        this.setState({ display: 'none' });
      }
    }
  }

  async changeDisplay() {
    const newState = !this.state.checked;
    this.setState({ checked: newState });
    if (!this.props.showAll && !this.state.checked) {
      const newDisplay = this.state.display === 'block' ? 'none' : 'block';
      this.setState({ display: newDisplay });

      // Make an API request to toggle the completed status of the task
      const taskId = this.props.taskId;
      const completed = newState;
      try {
        await axios.put(`http://127.0.0.1:5000/tasks/${taskId}`, { completed });
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    return (
      <div style={{display: this.state.display}} >
        <Form.Check className='checkbox' type='checkbox' label={this.props.label} onClick={() => this.changeDisplay()} />
        <p>Due: {this.props.deadline}</p>
      </div>
    );
  }
}