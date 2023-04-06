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
    axios.get('http://127.0.0.1:5000/tasks-by-categories/0')
      .then(response => {
        this.setState({ tasksByCategory: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { tasksByCategory } = this.state;

    const categoryCount = Object.keys(tasksByCategory).length;
    const categoriesPerColumn = Math.ceil(categoryCount / 3);
    const columns = [[], [], []];

    Object.keys(tasksByCategory).forEach((category, index) => {
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
                  {tasksByCategory[category].map((item, itemIndex) => (
                    <React.Fragment key={item.id}>
                      <JsonCheckbox label={item.title} deadline={item.deadline}  showAll={this.props.showAll} />
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