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
    const currentWeek = Math.floor((today.getDate() - 1) / 7);
  
    switch (filter) {
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
      case 'year':
        filteredTasks = this.props.tasksByCategory[this.props.category].filter(task => {
          const taskDeadline = new Date(task.deadline);
          const taskYear = taskDeadline.getFullYear();
  
          return taskYear === currentYear;
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

  render() {
    const containerStyle = {
      backgroundColor: this.props.categories[this.props.category] || 'var(--tertiary-color)',
      border: 'none',
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

    return (
      <Card style={containerStyle} onMouseEnter={this.handleHover} onMouseLeave={this.handleMouseLeave}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>{this.props.category}</h2>
          <div style={filterContainerStyle}>
            <FaSort style={iconStyle} onClick={this.toggleSortOrder} title={`Sort by Deadline (${this.state.sortOrder.toUpperCase()})`} />
            <Form.Control as="select" style={filterStyle} onChange={this.handleFilterChange} defaultValue="all">
                <option value="all">All time</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
            </Form.Control>
          </div>
        </div>
        {this.state.tasks.map((item, itemIndex) => (
          <div key={item.id} className="task-item">
            <JsonCheckbox 
              label={item.title} 
              deadline={item.deadline} 
              taskId={item.id} 
              description={item.description} 
              category={this.props.category} 
              showAll={this.props.showAll} 
              flaskUrl={this.props.flaskUrl} 
              userId={this.props.userId} 
              onTaskCompletion={this.handleTaskCompletion}
            />
          </div>
        ))}
      </Card>
    );
  }
}
