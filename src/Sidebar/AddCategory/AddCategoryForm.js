import React from 'react';
import { SketchPicker } from 'react-color';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import UserCategories from '../../UserCategories';
import CirclePicker from 'react-color';

export default class AddCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      color: ""
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
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCategoryChange = (categoryId) => {
    this.setState({ category_id: categoryId });
  };

  render() {
    const { name, color } = this.state;

    return (
      <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={color}
            onChange={this.handleChange}
          />
        </label>
        <SketchPicker
          color={this.state.color}
          onChangeComplete={(color) => {
            this.setState({ color: color.hex });
          }}
        />
        <Button style={{backgroundColor: 'blue', border: 'none'}} type="submit">Submit</Button>
      </form>
    );
  }
}