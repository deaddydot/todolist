import React from 'react';
import axios from 'axios';
import DeleteTaskButton from './../DeleteTask/DeleteTaskButton';
import Button from 'react-bootstrap/Button';
import UserCategories from '../UserCategories';

export default class EditTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {},
      title: "",
      description: "",
      deadline: "",
      category_id: "",
      user_id : 0,
    };
  }

  componentDidMount() {
    axios.get(`${this.props.flaskUrl}/task/${this.props.taskId}`)
      .then(response => {
        this.setState({ 
          task: response.data,
          title: response.data.title,
          description: response.data.description,
          deadline: response.data.deadline,
          category_id: response.data.category_id,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, deadline, category_id } = this.state;
    const data = {
      title,
      description,
      deadline,
      category_id,
    };
    try {
      const response = await axios.put(`${this.props.flaskUrl}/tasks-edit/${this.props.taskId}`, data);
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
    const { task, title, description, deadline, category_id } = this.state;
    return (
      <><form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            key="title"
            value={title}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            key="description"
            value={description}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Deadline:
          <input
            type="text"
            name="deadline"
            key="deadline"
            value={deadline}
            onChange={this.handleChange}
          />
        </label>
        <UserCategories flaskUrl={this.props.flaskUrl} userId={this.state.user_id} onCategoryChange={this.handleCategoryChange} />
        <Button style={{backgroundColor: 'blue', border: 'none'}} type="submit">Submit</Button>
      </form>
      <DeleteTaskButton flaskUrl={this.props.flaskUrl} taskId={this.props.taskId} modalOpen={this.props.modalOpen}/></>
    );
  }
}