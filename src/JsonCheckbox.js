import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup';
import EditTaskButton from './EditTask/EditTaskButton';
import CopyButton from './copybutton/123';

function StarRating({ priority }) {
  //console.log('Priority is:', priority);
  const stars = [];
  for (let i = 1; i <= 5; i++) {
      if (i <= priority) {
          stars.push(<span key={i}>{'\u2605'}</span>);  // filled star
      } else {
          stars.push(<span key={i}>&#9734;</span>);  // empty star
      }
  }
  return <span style={{ marginLeft: '10px' }}>{stars}</span>;
}

export default class JsonCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      display: 'block',
      checked: false,
      open: false,
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
    this.setState({ display: newState ? 'none' : 'block' });
    if (!this.props.showAll && !this.state.checked) {
      const newDisplay = this.state.display === 'block' ? 'none' : 'block';
      this.setState({ display: newDisplay });
    }

    // Make an API request to toggle the completed status of the task
    const taskId = this.props.taskId;
    const completed = newState;
    try {
      await axios.put(`${this.props.flaskUrl}/tasks-edit/${taskId}`, { completed });
      // Invoke the callback function to update the parent's state
      this.props.onTaskCompletion(taskId, completed);
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
    //console.log('Priority prop passed to StarRating:', this.props.priority);
    if (this.state.display === 'none') return null;

    const { textColor } = this.props;

    const textStyle = {
      color: textColor,
    };

    return (
      <div onMouseEnter={this.handleHover} onMouseLeave={this.handleMouseLeave}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <ListGroup>
            <div style={{...textStyle, textAlign: 'left', padding: '0', margin: '0'}} onClick={() => this.setOpen(!this.state.open)} aria-controls='collapse1' aria-expanded={this.state.open}>
              <Form.Check className='checkbox' style={textStyle} type='checkbox' label={this.props.label} onClick={() => this.changeDisplay()} />
              <StarRating priority={this.props.priority} />
              <p style={textStyle}>Due: {this.state.formattedDeadline}</p>
            </div>
            <Collapse in={this.state.open}>
              <div id='collapse1' style={{padding: '0', margin: '0'}}>
                <p style={textStyle}>{this.props.description}</p>
              </div>
            </Collapse>
          </ListGroup>
          {this.state.showEdit && (
            <>
              <CopyButton  taskData={{ title: this.props.label, deadline: this.state.formattedDeadline }} />
              <EditTaskButton
                flaskUrl={this.props.flaskUrl}
                taskId={this.props.taskId}
                hideEditButton={this.handleMouseLeave}
                userId={this.props.userId}
                nightMode={this.props.nightMode}
              />
             </>
          )}
        </div>
      </div>
    );
  }
}
