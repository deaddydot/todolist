import React from 'react';
import axios from 'axios';
import JsonCheckbox from '../JsonCheckbox';
import {Col, Row, Card} from 'react-bootstrap';

export default class TaskViewData extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      data: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get('https://deaddydot.github.io/todolist/data2.json');
      this.setState({ data: response.data });
    }
    catch(error) {
      console.error('Error fetching data: ', error);
    }
  }

  render() {
    const { data } = this.state;

    const categoryCount = Object.keys(data).length;
    const categoriesPerColumn = Math.ceil(categoryCount / 3);
    const columns = [[], [], []];

    Object.keys(data).forEach((category, index) => {
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
                  {data[category].map((item, itemIndex) => (
                    <React.Fragment key={item.id}>
                      <JsonCheckbox label={item.title} deadline={item.deadline}  showAll={this.props.showAll} nightMode={this.props.nightMode}/>
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