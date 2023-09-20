import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import UserCategories from '../../UserCategories';
import './AddTaskForm.css';

const ModalLooks = {
  position: "fixed",
  zIndex: "1",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.4)"
};

const ModalContent = {
  backgroundColor: "#fefefe",
  margin: '15% auto',
  padding: '20px',
  border: '1px solid #888',
  width: '80%'
};

const Close = {
  color: '#aaa',
  position: 'absolute',
  right: '1rem',
  top: '0',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center'
};

export default class AddTaskForm extends Component {
  state = {
    title: "",
    description: "",
    deadline: "",
    category_id: "",
    error: null
  };

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'hidden';
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, deadline, category_id } = this.state;
    const { flaskUrl, userId, onTaskAdded, modalClose } = this.props;

    const datetimeObject = new Date(deadline);
    const formattedDatetime = `${datetimeObject.getMonth() + 1}-${datetimeObject.getDate()}-${datetimeObject.getFullYear()} ${datetimeObject.getHours()}:${datetimeObject.getMinutes()}:${datetimeObject.getSeconds()}`;
    const response = await axios.post(`${flaskUrl}/tasks/${userId}`, {
      title,
      description,
      formattedDatetime,
      category_id
    });
    // onTaskAdded(response.data.category_id);
    modalClose();
    window.location.reload();

  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCategoryChange = (categoryId) => {
    this.setState({ category_id: categoryId });
  };

  render() {
    const { title, description, deadline, error } = this.state;
    const { flaskUrl, userId, modalClose } = this.props;
  
    const CloseInsideForm = {
      color: '#aaa',
      position: 'absolute',
      right: '1rem',
      top: '1rem',
      fontSize: '28px',
      fontWeight: 'bold',
      cursor: 'pointer'
    };
  
    const FormStyle = {
      width: '30%',  // Set the form's width to 50% of the screen
      margin: '0 auto',  // Center the form horizontally
    };
    
    const CenterModal = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000  // Make sure the modal is above everything else
    };
  
    return (
      <div className="myModal" style={{...ModalLooks, ...CenterModal}}>
        <form onSubmit={this.handleSubmit} className="add-task-form" style={FormStyle}>
          {/* Add a close button at the top right corner within the form */}
          <span style={CloseInsideForm} className="close" onClick={modalClose}>
            X
          </span>
          <label>
            Title:{" "}
            <input type="text" name="title" value={title} onChange={this.handleChange} />
          </label>
          <label>
            Description:{" "}
            <input type="text" name="description" value={description} onChange={this.handleChange} />
          </label>
          <label>
            Deadline:{" "}
            <input type="datetime-local" name="deadline" value={deadline} onChange={this.handleChange} />
          </label>
          <UserCategories flaskUrl={flaskUrl} userId={userId} onCategoryChange={this.handleCategoryChange} />
          <Button className="submit-button" type="submit" disabled={!title || !deadline}>
            Submit
          </Button>
        </form>
      </div>
    );
  }}
