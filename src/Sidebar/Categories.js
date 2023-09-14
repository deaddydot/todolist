import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import './Sidebar';

export default class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      tasks: {},
    }
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
      if (category.is_toggled) { // Only render if is_toggled is true
        return (
          <ListGroup.Item
            key={index}
            className='text-center'
            style={{ border: 'none', backgroundColor: `${category.color}` || 'var(--tertiary-color)' }}
            onClick={() => this.toggleCategory(category.id)} // Add the click event handler here
          >
            <h4>{category.name}</h4>
          </ListGroup.Item>
        );
      }
      return null; // Return null if is_toggled is false
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
