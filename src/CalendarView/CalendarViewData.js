import React from 'react';
import axios from 'axios';
import JsonCheckbox from '../JsonCheckbox';
import {Col, Row, Card} from 'react-bootstrap';

export default class CalendarViewData extends React.Component {
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
      const parsedData = this.parseDeadlines(response.data);
      this.setState({ data: parsedData });
    }
    catch(error) {
      console.error('Error fetching data: ', error);
    }
  }

  parseDeadlines(data) {
    const parsedData = {};
    Object.keys(data).forEach(category => {
      parsedData[category] = data[category].map(item => {
        const deadline = item.deadline.substring(0, 3);
        var dayOfWeek;
        
        switch (deadline) {
          case 'Sun':
            dayOfWeek = 0;
            break;
          case 'Mon':
            dayOfWeek = 1;
            break;
          case 'Tue':
            dayOfWeek = 2;
            break;
          case 'Wed':
            dayOfWeek = 3;
            break;
          case 'Thu':
            dayOfWeek = 4;
            break;
          case 'Fri':
            dayOfWeek = 5;
            break;
          case 'Sat':
            dayOfWeek = 6;
            break;
          default:
            dayOfWeek = 0;
        }

        return {...item, dayOfWeek, category};
      });
    });
    return parsedData;
  }

  generateColumns() {
    const { data } = this.state;
    const columns = Array.from({ length: 7 }, () => []);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    Object.keys(data).forEach((category) => {
      data[category].forEach((item) => {
        columns[item.dayOfWeek].push(item);
      });
    });

    return columns.map((columnItems, index) => (
      <Col key={index}>
        <h2>{dayNames[index]}</h2>
        {Object.keys(data).map(category => {
          const itemsInCategory = columnItems.filter(item => item.category === category);
          if (itemsInCategory.length > 0) {
            return (
              <Card key={`${index}-${category}`} style={{ backgroundColor: `var(--${category})`}}>
                <h3>{category}</h3>
                {itemsInCategory.map(item => (
                  <JsonCheckbox key={item.id} label={item.title} deadline={item.deadline} showAll={this.props.showAll} />
                ))}
              </Card>
            );
          }
        })}
      </Col>
    ));
  }
  
  render() {
    return (
      <Row style={{backgroundColor: 'var(--secondary-color)', height: '100vh'}}>
        {this.generateColumns()}
      </Row>
    );
  }
}