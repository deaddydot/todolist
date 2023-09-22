import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import UserCategories from '../../UserCategories';
import './AddTaskFormByCategory.css'; // Import the same CSS file

export default class AddTaskFormByCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      deadline: "",
      category_id: ""
    };
  }

  componentDidMount() {
    // fetch categories from Flask API when component mounts
    axios.get(`${this.props.flaskUrl}/categories/${this.props.userId}`)
      .then(response => {
        const categories = response.data;
        const currentCategory = categories.find(category => category.name === this.props.category);
        this.setState({ category_id: currentCategory.id });
      })
      .catch(error => {
        console.log(error);
      });
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
      const response = await axios.post(`${this.props.flaskUrl}/tasks/${this.props.userId}`, data);

      this.props.onTaskAdded(response.data.category_id);
    } catch (error) {
      console.error(error);
    }

    this.props.modalClose();

    window.location.reload();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { title, description, deadline} = this.state;

    const CloseInsideForm = {
      color: '#aaa',
      position: 'absolute',
      right: '1rem',
      top: '1rem',
      fontSize: '28px',
      fontWeight: 'bold',
      cursor: 'pointer'
    };

    const formStyle = {
      backgroundColor: this.props.nightMode ? '#282A3A' : 'white', // Set background color based on nightMode
      color: this.props.nightMode ? 'white' : 'black', // Set text color based on nightMode
      display: 'flex',
      flexDirection: 'column',
      width: '30%',
      margin: '0 auto',
    };

    
    return (
      <div style={{ width: '100%', position: 'relative' }}>
      {/* Add a close button at the top right corner within the form */}
      <form onSubmit={this.handleSubmit} className="add-task-form" style={formStyle}>
      <span style={CloseInsideForm} className="close" onClick={this.props.modalClose}>
        X
      </span>
        <label>
          Title: {" "}
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Description: {" "}
          <input
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Deadline: {" "}
          <input
            type="datetime-local"
            id="datetime"
            name="deadline"
            value={deadline}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Category: {" "}{this.props.category}
        </label>
        <Button style={{backgroundColor: 'blue', border: 'none'}} type="submit">Submit</Button>
      </form>
      </div>
    );
  }
}