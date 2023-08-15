import React from 'react';
import axios from 'axios';
import JsonCheckbox from '../JsonCheckbox';
import {Col, Row, Card, Button} from 'react-bootstrap';

export default class CalendarViewDataDatabase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      data: [],
      categories: {},
      currentDate: new Date(),
    };

    this.forwardWeek = this.forwardWeek.bind(this);
    this.backwardsWeek = this.backwardsWeek.bind(this);
  }

  componentDidMount() {
    this.getCurrentWeekDateRange();
    this.fetchData();
  }

  fetchData = async () => {
    const weekDateRange = this.getWeekDateRangeFromDate(this.state.currentDate);
  
    axios.all([
      axios.get(`${this.props.flaskUrl}/tasks-by-categories/${this.props.userId}`),
      axios.get(`${this.props.flaskUrl}/categories/${this.props.userId}`)
    ])
    .then(axios.spread((tasksResponse, categoriesResponse) => {
      const categories = categoriesResponse.data.reduce((acc, category) => {
        acc[category.name] = category.color;
        return acc;
      }, {});
  
      const data = tasksResponse.data;
      const filteredData = {};
      Object.keys(data).forEach(category => {
        const tasks = data[category].filter(task => {
          const taskDate = new Date(task.deadline);
          return taskDate >= weekDateRange.start && taskDate <= weekDateRange.end && !task.completed;
        });
        if (tasks.length > 0) {
          filteredData[category] = tasks;
        }
      });
  
      this.setState({ data: this.parseDeadlines(filteredData), categories });
    }))
    .catch(error => {
      console.log(error);
    });
  }

  getWeekDateRangeFromDate = (date) => {
    const currentDayOfWeek = date.getDay();
    const lessDays = currentDayOfWeek === 0 ? 6 : currentDayOfWeek; 

    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate() - lessDays);
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (6 - lessDays));

    // We set the time to ensure the whole day is included
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  }

  getCurrentWeekDateRange = () => {
    const now = new Date();
    this.setState({ currentDate: now });
    return this.getWeekDateRangeFromDate(now);
  }  

  forwardWeek() {
    const currentDate = new Date(this.state.currentDate);
    currentDate.setDate(currentDate.getDate() + 7);
    this.setState({ currentDate }, this.fetchData);
  }

  backwardsWeek() {
    const currentDate = new Date(this.state.currentDate);
    currentDate.setDate(currentDate.getDate() - 7);
    this.setState({ currentDate }, this.fetchData);
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
            break;
        }

        return {...item, dayOfWeek, category};
      });
    });
    return parsedData;
  }

  generateColumns() {
    const { data } = this.state;
    const columns = Array.from({ length: 7 }, () => []);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
              <Card key={`${index}-${category}`} style={{ backgroundColor: this.state.categories[category] || 'var(--tertiary-color)'}}>
                <h5>{category}</h5>
                {itemsInCategory.map(item => (
                  <JsonCheckbox key={item.id} label={item.title} deadline={item.deadline} taskId={item.id} description={item.description} showAll={this.props.showAll} flaskUrl={this.props.flaskUrl} userId={this.props.userId} />
                ))}
              </Card>
            );
          }
          else {
            return null;
          }
        })}
      </Col>
    ));
  }
  
  render() {
    return (
      <Row style={{backgroundColor: 'var(--secondary-color)', minHeight: '100vh', position: 'relative'}}>
        {this.generateColumns()}
        <Button onClick={() => this.backwardsWeek()} style={{zIndex: '10', width: 'auto', bottom: '2rem', left: '2rem', position: 'absolute'}}>&lt;</Button>
        <Button onClick={() => this.forwardWeek()} style={{zIndex: '10', width: 'auto', bottom: '2rem', right: '2rem', position: 'absolute'}}>&gt;</Button>
      </Row>
    );
  }
}