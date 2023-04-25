import React from 'react';
import axios from 'axios';
import DeleteTaskButton from './../DeleteTask/DeleteTaskButton';
import Button from 'react-bootstrap/Button';

export default class EditTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {},
      title: "",
      description: "",
      deadline: "",
      category_id: "",
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
      user_id: 0, // replace with the user ID of the currently logged-in user
      category_id,
    };
    try {
      const response = await axios.put(
        `${this.props.flaskUrl}/tasks/${this.props.taskId}`,
        data
      );
      console.log(response.data);
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
        <label>
          Category ID:
          <input
            type="text"
            name="category_id"
            key="category_id"
            value={category_id}
            onChange={this.handleChange}
          />
        </label>
        <Button style={{backgroundColor: 'blue', border: 'none'}} type="submit">Submit</Button>
      </form>
      <DeleteTaskButton flaskUrl={this.props.flaskUrl} taskId={this.props.taskId} modalOpen={this.props.modalOpen}/></>
    );
  }
}