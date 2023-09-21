import React from 'react';
import "./AddCategoryForm.css";
import { SketchPicker } from 'react-color';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class AddCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      color: "",
      isFormValid: false
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, color } = this.state;

    const data = {
      name,
      color,
    };

    try {
      const response = await axios.post(`${this.props.flaskUrl}/categories/${this.props.userId}`, data);
      this.props.onCategoryAdded(response.data.category_id);
    } catch (error) {
      console.error(error);
    }

    this.props.modalOpen();
    window.location.reload();
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.validateForm);
  };

  validateForm = () => {
    const { name, color } = this.state;
    const isFormValid = name && color;
    this.setState({ isFormValid });
  };

  handleColorChange = (event) => {
    this.setState({ color: event.target.value }, this.validateForm);
  };

  modalClose = () => {
    this.setState({ displayModal: false });
    document.body.style.overflow = 'auto';
  };
  
  render() {
    const { name, color, isFormValid } = this.state;
  
    const closeButtonStyle = {
      color: '#aaa',
      position: 'absolute',
      right: '1rem',
      top: '1rem',
      fontSize: '28px',
      fontWeight: 'bold',
      cursor: 'pointer'
    };
  
    return (
      <div style={{ position: 'relative' }}>
        <span style={closeButtonStyle} onClick={this.props.modalClose}>X</span>
        <form onSubmit={this.handleSubmit} className="add-category-form">
          <label>
            Name:{" "}
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Color:{" "}
            <input
              type="color"
              name="color"
              value={color}
              onChange={this.handleColorChange}
            />
          </label>
          <div className="submit-button-container">
          <Button className="submit-button" type="submit" disabled={!isFormValid}>
            Submit
          </Button>
          </div>
        </form>
      </div>
    );
  }
}
