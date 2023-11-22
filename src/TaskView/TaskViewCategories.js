import React from 'react';
import axios from 'axios';
import JsonCheckbox from '../JsonCheckbox';
import { Col, Row, Card, Form, Button } from 'react-bootstrap';
import AddTaskButtonByCategory from '../Sidebar/AddTask/AddTaskButtonByCategory';
import EditCategoryButton from '../EditCategory/EditCategoryButton';
import { FaSort } from 'react-icons/fa';
import "./TaskViewCategories.css"

export default class TaskViewCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      tasks: this.props.tasksByCategory[this.props.category],
      sortOrder: 'asc',
    };
  }

  handleHover = () => {
    this.setState({ showEdit: true });
  };

  handleMouseLeave = () => {
    this.setState({ showEdit: false });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sortOrder !== this.state.sortOrder) {
      this.sortTasks();
    }
  }

  toggleSortOrder = () => {
    this.setState({ sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc' });
  };

  sortTasks = () => {
    const { tasks, sortOrder } = this.state;
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    this.setState({ tasks: sortedTasks });
  };
  

  handleFilterChange = async (e) => {
    const filter = e.target.value;
    let filteredTasks = [];
  
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate(); // Get the current date
    const currentWeek = Math.floor((today.getDate() - 1) / 7);
  
    switch (filter) {
      case 'today':
        filteredTasks = this.props.tasksByCategory[this.props.category].filter(task => {
          const taskDeadline = new Date(task.deadline);
          const taskDate = taskDeadline.getDate(); // Get the task's date
          const taskMonth = taskDeadline.getMonth();
  
          return taskDate === currentDate && taskMonth === currentMonth; // Check if the task's date and month match the current date and month
        });
        break;
      case 'week':
        filteredTasks = this.props.tasksByCategory[this.props.category].filter(task => {
          const taskDeadline = new Date(task.deadline);
          const taskWeek = Math.floor((taskDeadline.getDate() - 1) / 7);
          const taskMonth = taskDeadline.getMonth();
  
          return taskWeek === currentWeek && taskMonth === currentMonth;
        });
        break;
      case 'month':
        filteredTasks = this.props.tasksByCategory[this.props.category].filter(task => {
          const taskDeadline = new Date(task.deadline);
          const taskMonth = taskDeadline.getMonth();
  
          return taskMonth === currentMonth;
        });
        break;
      default:
        filteredTasks = this.props.tasksByCategory[this.props.category];
        break;
    }
  
    this.setState({ tasks: filteredTasks });
  };

  handleTaskCompletion = (taskId, completed) => {
    const updatedTasks = this.state.tasks.map(task => {
      if (task.id === taskId) {
        task.completed = completed;
      }
      return task;
    });
    
    this.setState({ tasks: updatedTasks });
  };

  getTextColor(backgroundColor) {
    let r = parseInt(backgroundColor.slice(1, 3), 16);
    let g = parseInt(backgroundColor.slice(3, 5), 16);
    let b = parseInt(backgroundColor.slice(5, 7), 16);
    let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }

  render() {

    const backgroundColor = this.props.categories[this.props.category] || 'var(--tertiary-color)';
    const textColor = this.getTextColor(backgroundColor);

    const containerStyle = {
      backgroundColor: backgroundColor,
      color: textColor,
      border: `1px solid ${this.props.nightMode ? 'white' : 'black'}`, // Conditional border color based on nightMode
      padding: '1rem',
      position: 'relative'
    };

    const headerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '1rem'
    };

    const titleStyle = {
      fontSize: '1.5rem',
      marginBottom: '1rem'
    };

    const filterContainerStyle = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem'
    };

    const filterStyle = {
      width: '150px',
      marginLeft: '1rem'
    };

    const iconStyle = {
      cursor: 'pointer',
      marginRight: '1rem'
    };

    const editButtonStyle = {
      position: 'absolute', // Absolutely position the edit button
      top: '10px', // Adjust as needed
      right: '10px', // Adjust as needed
    };

    const buttonsContainerStyle = {
      position: 'absolute', // Absolutely position the buttons container
      top: '10px', // Adjust as needed
      right: '10px', // Adjust as needed
      display: 'flex', // Use flexbox to layout the buttons
      gap: '10px' // Adjust the gap between the buttons as needed
    };

    return (
      <Card style={containerStyle} onMouseEnter={this.handleHover} onMouseLeave={this.handleMouseLeave}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>{this.props.category}</h2>
          <div style={filterContainerStyle}>
            <FaSort style={iconStyle} onClick={this.toggleSortOrder} title={`Sort by Deadline (${this.state.sortOrder.toUpperCase()})`} />
            <Form.Control as="select" style={filterStyle} onChange={this.handleFilterChange} defaultValue="all">
                <option value="all">All time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
            </Form.Control>
          </div>
        </div>
        {this.state.showEdit && (
          <div style={buttonsContainerStyle}>
            <EditCategoryButton flaskUrl={this.props.flaskUrl} category={this.props.category} userId={this.props.userId} nightMode={this.props.nightMode} />
            <AddTaskButtonByCategory flaskUrl={this.props.flaskUrl} category={this.props.category} userId={this.props.userId} nightMode={this.props.nightMode} />
          </div>
        )}
        {this.state.tasks.map((task) => (
          <div key={task.id} id="task-item">
            <JsonCheckbox 
              label={task.title} 
              deadline={task.deadline} 
              taskId={task.id} 
              description={task.description} 
              category={this.props.category} 
              showAll={this.props.showAll} 
              flaskUrl={this.props.flaskUrl} 
              userId={this.props.userId} 
              onTaskCompletion={this.handleTaskCompletion}
              nightMode={this.props.nightMode}
              //boldHover={this.props.boldHover}
              priority={task.priority} // This should be task.priority, not this.props.priority
              textColor={textColor}
            />
          </div>
        ))}

      </Card>
    );
  }
}
