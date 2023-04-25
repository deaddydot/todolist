import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import "./../EditTask/EditTaskButton";



export default class DeleteTaskButton extends React.Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask() {
    axios.delete(`${this.props.flaskUrl}/task/${this.props.taskId}`)

    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });

    this.props.modalOpen();

    window.location.reload();
  }

  modalOpen() {
    const temp = !this.state.displayModal;
    this.setState({displayModal: temp})
  }

  render() {
    return(
      <Button type="submit" onClick={this.deleteTask} style={{backgroundColor:'red', border:'none'}}>Delete</Button>
    )
  }
}