import React from 'react';
import axios from 'axios';
import DeleteTaskButton from './../DeleteTask/DeleteTaskButton';
import Button from 'react-bootstrap/Button';
import UserCategories from '../UserCategories';
import './EditTaskForm.css'

export default class EditTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {},
      title: "",
      description: "",
      deadline: "",
      category_id: ""
    };
  }

  componentDidMount() {
    axios.get(`${this.props.flaskUrl}/task/${this.props.taskId}`)
      .then(response => {
        const task = response.data;
        const deadlineDate = new Date(task.deadline);
        const formattedDeadline = deadlineDate.toISOString().substring(0, 16);
        this.setState({
          task,
          title: task.title,
          description: task.description,
          deadline: formattedDeadline,
          category_id: task.category_id,
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

    const CloseInsideForm = {
      color: '#aaa',
      position: 'absolute',
      right: '1rem',
      top: '1rem',
      fontSize: '28px',
      fontWeight: 'bold',
      cursor: 'pointer'
    };

    const ButtonContainerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    };

    return (
      <div style={{ position: 'relative', width: "30%", margin: '0 auto' }}>
        <form onSubmit={this.handleSubmit} className={`edit-task-form ${this.props.nightMode ? 'night-mode' : ''}`}>
          <span style={CloseInsideForm} className="close" onClick={this.props.modalClose}>
            X
          </span>
          <label>
            Title:{" "}
            <input
              type="text"
              name="title"
              key="title"
              value={title}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Description:{" "}
            <input
              type="text"
              name="description"
              key="description"
              value={description}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Deadline:{" "}
            <input
              type="datetime-local"
              id="datetime"
              name="deadline"
              value={deadline}
              onChange={this.handleChange}
            />
          </label>
          <UserCategories flaskUrl={this.props.flaskUrl} userId={this.props.userId} onCategoryChange={this.handleCategoryChange} selectedCategoryId={category_id} />
          <div style={ButtonContainerStyle}>
            <Button style={{backgroundColor: 'blue', border: 'none', width: 200, margin: 20}} type="submit">Submit</Button>
            <DeleteTaskButton flaskUrl={this.props.flaskUrl} taskId={this.props.taskId} modalOpen={this.props.modalOpen}/>
          </div>
        </form>
      </div>
    );
}
}