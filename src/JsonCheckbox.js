import React from 'react';
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup';
import EditTaskButton from './EditTask/EditTaskButton';

export default class JsonCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      display: 'block',
      checked: false,
      open: false
    };
    this.changeDisplay = this.changeDisplay.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }

  setOpen(value) {
    this.setState({ open: value });
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
    }

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
    return (
      <div style={{display: this.state.display}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <ListGroup>
            <div style={{textAlign: 'left', padding: '0', margin: '0'}} onClick={() => this.setOpen(!this.state.open)} aria-controls='collapse1' aria-expanded={this.state.open}>
              <Form.Check className='checkbox' type='checkbox' label={this.props.label} onClick={() => this.changeDisplay()} />
              <p>Due: {this.props.deadline}</p>
            </div>
            <Collapse in={this.state.open}>
              <div id='collapse1' style={{padding: '0', margin: '0'}}>
                <ListGroup.Item className='text-left' style={{border: 'none', backgroundColor: `var(--${this.props.category})`, padding: '0', margin: '0'}}>
                  <p>{this.props.description}</p>
                </ListGroup.Item>
              </div>
            </Collapse>
          </ListGroup>
          <div>
            <EditTaskButton flaskUrl={this.props.flaskUrl} taskId={this.props.taskId}/>
          </div>
        </div>
      </div>
    );
  }
}