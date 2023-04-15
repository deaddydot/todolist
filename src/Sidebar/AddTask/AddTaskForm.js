import React from 'react';
import axios from 'axios';

export default class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      deadline: "",
      category_id: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, deadline, category_id } = this.state;
    const data = {
      title,
      description,
      deadline,
      user_id: 0, // replace with the user ID of the currently logged-in user
      category_id,
    };
    try {
      const response = await axios.post(
        `${this.props.flaskUrl}/tasks`,
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { title, description, deadline, category_id } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Deadline:
          <input
            type="text"
            name="deadline"
            value={deadline}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Category ID:
          <input
            type="text"
            name="category_id"
            value={category_id}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}