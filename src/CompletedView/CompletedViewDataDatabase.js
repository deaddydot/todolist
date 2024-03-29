import React from 'react';
import axios from 'axios';
import CompletedViewJsonCheckbox from './CompletedViewJsonCheckbox';
import {Col, Row, Card} from 'react-bootstrap';
import AddTaskButtonByCategory from '../Sidebar/AddTask/AddTaskButtonByCategory';
import CompletedViewCategories from './CompletedViewCategories';

export default class CompletedViewDataDatabase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksByCategory: [],
      categories: {},
      showEdit: false,
    };
  }

  componentDidMount() {
    axios.all([
      axios.get(`${this.props.flaskUrl}/tasks-by-categories/${this.props.userId}`),
      axios.get(`${this.props.flaskUrl}/categories/${this.props.userId}`)
    ])
    .then(axios.spread((tasksResponse, categoriesResponse) => {
      const tasksByCategory = tasksResponse.data;
      const categories = categoriesResponse.data.reduce((acc, category) => {
          acc[category.name] = category.color;
          return acc;
      }, {});

      this.setState({ tasksByCategory, categories });
    }))
    .catch(error => {
      console.log(error);
    });
  }

  handleHover = () => {
    this.setState({showEdit: true});
  };

  handleMouseLeave = () => {
    this.setState({showEdit: false});
  };

  render() {
    const { tasksByCategory } = this.state;

    // Filter out completed tasks
    const filteredTasksByCategory = {};
    Object.keys(tasksByCategory).forEach(category => {
      filteredTasksByCategory[category] = tasksByCategory[category].filter(task => task.completed);
    });
  
    const categoryCount = Object.keys(filteredTasksByCategory).length;
    const categoriesPerColumn = Math.ceil(categoryCount / 3);
    const columns = [[], [], []];
  
    Object.keys(filteredTasksByCategory).forEach((category, index) => {
      const columnIndex = Math.floor(index / categoriesPerColumn);
      columns[columnIndex].push(category);
    });
  
    return (
      <Row style={{backgroundColor: this.props.nightMode ? 'var(--night-background-color)' : 'var(--secondary-color)', minHeight: '100vh'}}>
        {columns.map((column, colIndex) => (
          <Col key={`column-${colIndex}`}>
            {column.map((category, index) => (
              <React.Fragment key={`category-${index}`}>
                <CompletedViewCategories tasksByCategory={filteredTasksByCategory} category={category} userId={this.props.userId} categories={this.state.categories} flaskUrl={this.props.flaskUrl}/>
              </React.Fragment>
            ))}
          </Col>
        ))}
      </Row>
    );
  }
}