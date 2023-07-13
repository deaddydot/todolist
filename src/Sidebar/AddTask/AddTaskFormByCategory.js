import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import UserCategories from '../../UserCategories';

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

    this.props.modalOpen();

    window.location.reload();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
        <label>
          Category: {this.props.category}
        </label>
        <Button style={{backgroundColor: 'blue', border: 'none'}} type="submit">Submit</Button>
      </form>
    );
  }
}