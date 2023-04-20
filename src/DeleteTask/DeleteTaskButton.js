import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import "./../EditTask/EditTaskButton";



export default class DeleteTaskButton extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {displayModal: false};

    // this.modalopen = this.modalopen.bind(this);
  }

  modalopen() {
    const temp = !this.state.displayModal;
    this.setState({displayModal: temp})
  }

  render() {
    return(
      <button style={{paddingBottom: 7, paddingTop: 7}} type="submit" onClick={this.modalopen}>Delete</button>
    )
  }
}