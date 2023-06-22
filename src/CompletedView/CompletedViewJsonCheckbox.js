import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import EditTaskButton from '../EditTask/EditTaskButton';
import EditCategoryButton from '../EditCategory/EditCategoryButton';
import { ListGroup, Collapse } from 'react-bootstrap';

export default class CompletedViewJsonCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
      showEdit: false,
    };
    this.changeDisplay = this.changeDisplay.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }

  setOpen(value) {
    this.setState({ open: value });
  }

  async changeDisplay(event) {
    const newState = event.target.checked;
    this.setState({ checked: newState });

    // Make an API request to toggle the completed status of the task
    const taskId = this.props.taskId;
    const completed = newState;
    try {
      await axios.put(`${this.props.flaskUrl}/tasks-edit/${taskId}`, { completed });
    } catch (error) {
      console.error(error);
    }
  }

  handleHover = () => {
    this.setState({showEdit: true});
  };

  handleMouseLeave = () => {
    this.setState({showEdit: false});
  };

  render() {
    const display = this.props.showAll || this.state.checked ? 'block' : 'none';
    return (
      <div style={{ display }} onMouseEnter={this.handleHover} onMouseLeave={this.handleMouseLeave}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <ListGroup>
            <div style={{textAlign: 'left', padding: '0', margin: '0'}} onClick={() => this.setOpen(!this.state.open)} aria-controls='collapse1' aria-expanded={this.state.open}>
              <Form.Check
                className='checkbox'
                type='checkbox'
                label={this.props.label}
                defaultChecked={this.props.checked}
                onChange={(event) => this.changeDisplay(event)}
              />
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
          {this.state.showEdit && 
            <EditTaskButton flaskUrl={this.props.flaskUrl} taskId={this.props.taskId} hideEditButton={this.handleMouseLeave} />
          }
        </div>
      </div>
    );
  }
}

