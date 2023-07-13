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
      formattedDeadline: ''
    };
    this.changeDisplay = this.changeDisplay.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }

  componentDidMount() {
    const date = new Date(this.props.deadline);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = days[date.getUTCDay()];
    const num = date.getUTCDate();
    const month = months[date.getUTCMonth()];

    var hour = date.getUTCHours();
    const period = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12;

    var minutes = date.getUTCMinutes();
    minutes = minutes < 10 ? '0'+minutes : minutes;

    const formattedDeadline = `${day}, ${num} ${month} ${hour}:${minutes}${period}`;

    this.setState({formattedDeadline: formattedDeadline})
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
              <p>Due: {this.state.formattedDeadline}</p>
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
            <EditTaskButton flaskUrl={this.props.flaskUrl} taskId={this.props.taskId} hideEditButton={this.handleMouseLeave} userId={this.props.userId} />
          }
        </div>
      </div>
    );
  }
}

