import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import UserCategories from '../../UserCategories';

export default class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      deadline: "",
      category_id: "",
      user_id: 0,    // pass this down by props
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, deadline, category_id } = this.state;
    
    const datetimeObject = new Date(deadline);
    const formattedDatetime = `${datetimeObject.getMonth()+1}-${datetimeObject.getDate()}-${datetimeObject.getFullYear()} ${datetimeObject.getHours()}:${datetimeObject.getMinutes()}:${datetimeObject.getSeconds()}`;

    const data = {
      title,
      description,
      formattedDatetime,
      category_id,
    };
    try {
      const response = await axios.post(`${this.props.flaskUrl}/tasks/${this.state.user_id}`, data);

      this.props.onTaskAdded(response.data.category_id);
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
    const { title, description, deadline, category_id } = this.state;

    return (
      <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
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
            type="datetime-local"
            id="datetime"
            name="deadline"
            value={deadline}
            onChange={this.handleChange}
          />
        </label>
        <UserCategories flaskUrl={this.props.flaskUrl} userId={this.state.user_id} onCategoryChange={this.handleCategoryChange} />
        <Button style={{backgroundColor: 'blue', border: 'none'}} type="submit">Submit</Button>
      </form>
    );
  }
}