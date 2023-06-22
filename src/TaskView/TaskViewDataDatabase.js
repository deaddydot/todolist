import React from 'react';
import axios from 'axios';
import JsonCheckbox from '../JsonCheckbox';
import {Col, Row, Card} from 'react-bootstrap';
import AddTaskButtonByCategory from '../Sidebar/AddTask/AddTaskButtonByCategory';

export default class TaskViewDataDatabase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksByCategory: [],
      categories: {},
    };
  }

  componentDidMount() {
    axios.all([
      axios.get(`${this.props.flaskUrl}/tasks-by-categories/0`),
      axios.get(`${this.props.flaskUrl}/categories/0`)
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


  render() {
    const { tasksByCategory } = this.state;

    // Filter out completed tasks
    const filteredTasksByCategory = {};
    Object.keys(tasksByCategory).forEach(category => {
      filteredTasksByCategory[category] = tasksByCategory[category].filter(task => !task.completed);
    });
  
    const categoryCount = Object.keys(filteredTasksByCategory).length;
    const categoriesPerColumn = Math.ceil(categoryCount / 3);
    const columns = [[], [], []];
  
    Object.keys(filteredTasksByCategory).forEach((category, index) => {
      const columnIndex = Math.floor(index / categoriesPerColumn);
      columns[columnIndex].push(category);
    });
  
    return (
      <Row style={{backgroundColor: 'var(--secondary-color)', minHeight: '100vh'}}>
        {columns.map((column, colIndex) => (
          <Col key={`column-${colIndex}`}>
            {column.map((category, index) => (
              <React.Fragment key={`category-${index}`}>
                <Card style={{backgroundColor: this.state.categories[category] || 'var(--tertiary-color)', border: 'none', padding: '1rem', position: 'relative'}}>
                  <h2>{category}</h2>
                  <AddTaskButtonByCategory style={{ position: 'absolute', top: '0', right: '0' }} category={category} flaskUrl={this.props.flaskUrl} />
                  {filteredTasksByCategory[category].map((item, itemIndex) => (
                    <React.Fragment key={item.id}>
                      <JsonCheckbox label={item.title} deadline={item.deadline} taskId={item.id} description={item.description} category={this.category} showAll={this.props.showAll} flaskUrl={this.props.flaskUrl} />
                    </React.Fragment>
                  ))}
                </Card>
              </React.Fragment>
            ))}
          </Col>
        ))}
      </Row>
    );
  }
}