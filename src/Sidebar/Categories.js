import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import './Sidebar.css';  // Assuming you have a Sidebar.css file

export default class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      tasks: {},
    };
  }

  componentDidMount() {
    // Fetch categories from Flask API when the component mounts
    axios.get(`${this.props.flaskUrl}/categories/${this.props.userId}`)
      .then(response => {
        this.setState({ categories: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchCategories = () => {
    axios.get(`${this.props.flaskUrl}/categories/${this.props.userId}`)
      .then(response => {
        this.setState({ categories: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggleCategory = (categoryId) => {
    axios.post(`${this.props.flaskUrl}/category/toggle/${categoryId}`)
      .then(response => {
        // Toggle the category's status in the state
        const updatedCategories = this.state.categories.map(category => {
          if (category.id === categoryId) {
            return { ...category, is_toggled: !category.is_toggled };
          }
          return category;
        });

        this.setState({ categories: updatedCategories });

        this.props.updateCategories(updatedCategories);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    
    const categoryOptions = this.state.categories.map((category, index) => {
      return (
        <ListGroup.Item
          key={index}
          className='text-center'
          style={{ border: 'none', backgroundColor: `${category.is_toggled ? category.color : 'grey'}` }}
          onClick={() => this.toggleCategory(category.id)}
        >
          <h4>{category.name}</h4>
        </ListGroup.Item>
      );
    });

    const taskLists = Object.keys(this.state.tasks).map((categoryName, index) => {
      const tasksInCategory = this.state.tasks[categoryName].map((task, taskIndex) => (
        <div key={taskIndex}>
          {/* Render individual tasks here */}
          <p>{task.taskName}</p>
          {/* Add more task details as needed */}
        </div>
      ));

      return (
        <div key={index}>
          <h3>{categoryName}</h3>
          {tasksInCategory}
        </div>
      );
    });

    return (
      <div>
        <div style={{ margin: '10px', borderRadius: '10px' }}>
          {categoryOptions}
        </div>
      </div>
    );

  }
}
