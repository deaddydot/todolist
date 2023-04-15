import React from 'react';
import axios from 'axios';
import JsonCheckbox from '../JsonCheckbox';
import {Col, Row, Card} from 'react-bootstrap';

export default class TaskViewDataDatabase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksByCategory: [],
    };
  }

  componentDidMount() {
    axios.get(`${this.props.flaskUrl}/tasks-by-categories/0`)
      .then(response => {
        this.setState({ tasksByCategory: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // createTask = (title, description, deadline, category_id) => {
  //   axios.post(`${this.props.flaskUrl}/tasks`, {
  //     title: title,
  //     description: description,
  //     deadline: deadline,
  //     user_id: 0,
  //     category_id: category_id,
  //   })
  //   .then(response => {
  //     const newTask = response.data;
  //     const updatedTasksByCategory = {...this.state.tasksByCategory};
  //     updatedTasksByCategory[newTask.category_name].push(newTask);
  //     this.setState({ tasksByCategory: updatedTasksByCategory });
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }

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
      <Row style={{backgroundColor: 'var(--secondary-color)', height: '100vh'}}>
        {columns.map((column, colIndex) => (
          <Col key={`column-${colIndex}`}>
            {column.map((category, index) => (
              <React.Fragment key={`category-${index}`}>
                <Card style={{backgroundColor: `var(--${category})`, border: 'none', padding: '1rem'}}>
                  <h2>{category}</h2>
                  {filteredTasksByCategory[category].map((item, itemIndex) => (
                    <React.Fragment key={item.id}>
                      <JsonCheckbox label={item.title} deadline={item.deadline} taskId={item.id} showAll={this.props.showAll} />
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