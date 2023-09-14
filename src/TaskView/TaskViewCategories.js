import React from 'react';
import axios from 'axios';
import JsonCheckbox from '../JsonCheckbox';
import { Col, Row, Card, Form, Button } from 'react-bootstrap';
import AddTaskButtonByCategory from '../Sidebar/AddTask/AddTaskButtonByCategory';
import EditCategoryButton from '../EditCategory/EditCategoryButton';

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
    return (
      <Card style={{ backgroundColor: this.props.categories[this.props.category] || 'var(--tertiary-color)', border: 'none', padding: '1rem', position: 'relative' }}>
        <h2>{this.props.category}</h2>
        <Button variant="primary" onClick={this.toggleSortOrder}>
          Sort by Deadline ({this.state.sortOrder.toUpperCase()})
        </Button>
        <div style={{ position: 'absolute', right: 15, top: 17 }}>
          <div style={{ position: 'relative', left: 0, top: 0, marginBottom: '-0.5rem' }}>
            {this.state.showEdit && 
              <EditCategoryButton
                category={this.props.category}
                flaskUrl={this.props.flaskUrl}
                userId={this.props.userId}
              />
            }
          </div>
          <div style={{ position: 'relative', right: 30, top: -24, marginBottom: '-0.5rem' }}>
            {this.state.showEdit && 
              <AddTaskButtonByCategory
                category={this.props.category}
                flaskUrl={this.props.flaskUrl}
                userId={this.props.userId}
              />
            }
          </div>
        </div>
        <Form.Control as="select" onChange={this.handleFilterChange}>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </Form.Control>
        {this.state.tasks.map((item, itemIndex) => (
          <React.Fragment key={item.id}>
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
          </React.Fragment>
        ))}
      </Card>
    );
  }
}
