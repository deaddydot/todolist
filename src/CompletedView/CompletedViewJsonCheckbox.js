import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import EditTaskButton from '../EditTask/EditTaskButton';

export default class CompletedViewJsonCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
      showEdit: false,
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
          <div>
            <Form.Check
              className='checkbox'
              type='checkbox'
              label={this.props.label}
              defaultChecked={this.props.checked}
              onChange={(event) => this.changeDisplay(event)}
            />
            <p>Due: {this.props.deadline}</p>
          </div>
          {this.state.showEdit && 
            <EditTaskButton flaskUrl={this.props.flaskUrl} taskId={this.props.taskId}/>
          }
        </div>
      </div>
    );
  }
}
