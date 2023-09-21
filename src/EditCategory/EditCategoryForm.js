import React from 'react';
import { SketchPicker } from 'react-color';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import DeleteCategoryButton from './../DeleteCategory/DeleteCategoryButton';
import './EditCategoryForm.css';

export default class EditCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: "",
      name: "",
      color: ""
    };
  }
  
  componentDidMount() {
    axios.get(`${this.props.flaskUrl}/categories/${this.props.userId}`)
      .then(response => {
        const categories = response.data;
        const currentCategory = categories.find(category => category.name === this.props.category);
        this.setState({ category_id: currentCategory.id });
        axios.get(`${this.props.flaskUrl}/category/${currentCategory.id}`)
          .then(response => {
            const category = response.data;
            this.setState({
              category,
              name: category.name,
              color: category.color,
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });

  }
  
  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, color } = this.state;

    const data = {
      name,
      color,
    };
    try {
      const response = await axios.put(`${this.props.flaskUrl}/categories/${this.state.category_id}`, data);

      this.props.onCategoryAdded(response.data.category_id);
    } catch (error) {
      console.error(error);
    }

    this.props.modalOpen();

    window.location.reload();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { name, color } = this.state;

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
      width: '40%',
      margin: '0 auto',
    };
    
    return (
      <div style={FormStyle}>
        {/* Add a close button at the top right corner within the form */}
        <span style={CloseInsideForm} className="close" onClick={this.props.modalClose}>
          X
        </span>
        <form onSubmit={this.handleSubmit} className="edit-category-form">
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
          <div className="button-container">
          <Button className="submit-button" type="submit">Submit</Button>
          <DeleteCategoryButton className="delete-button" flaskUrl={this.props.flaskUrl} categoryId={this.state.category_id} modalOpen={this.props.modalOpen} />
        </div>
      </form>
    </div>
  );
}
}