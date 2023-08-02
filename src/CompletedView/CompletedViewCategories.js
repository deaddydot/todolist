import React from 'react';
import CompletedViewJsonCheckbox from './CompletedViewJsonCheckbox';
import {Col, Row, Card} from 'react-bootstrap';
import AddTaskButtonByCategory from '../Sidebar/AddTask/AddTaskButtonByCategory';
import EditCategoryButton from '../EditCategory/EditCategoryButton';


export default class TaskViewCategories extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
    };
  }

  handleHover = () => {
    this.setState({showEdit: true});
  };

  handleMouseLeave = () => {
    this.setState({showEdit: false});
  };

  render(){

    return (
    <Card style={{backgroundColor: this.props.categories[this.props.category] || 'var(--tertiary-color)', border: 'none', padding: '1rem', position: 'relative'}} onMouseEnter={this.handleHover} onMouseLeave={this.handleMouseLeave}>
      <h2>{this.props.category}</h2>
        <div style={{position: 'absolute', right: 15, top: 17}}>
          <div style={{position: 'relative', left: 0, top: 0, marginBottom: '-0.5rem' }}>
            {this.state.showEdit && 
              <EditCategoryButton
              category={this.props.category}
              flaskUrl={this.props.flaskUrl}
              userId={this.props.userId}
            />
            }
          </div>
            <div style={{position: 'relative', right: 30, top: -24, marginBottom: '-0.5rem' }}>
            {this.state.showEdit && 
              <AddTaskButtonByCategory
              category={this.props.category}
              flaskUrl={this.props.flaskUrl}
              userId={this.props.userId}
              />
            }
          </div>
        </div>
          {this.props.tasksByCategory[this.props.category].map((item, itemIndex) => (
            <React.Fragment key={item.id}>
              <CompletedViewJsonCheckbox checked={true} label={item.title} deadline={item.deadline} taskId={item.id} description={item.description} category={this.props.category} showAll={!this.props.showAll} flaskUrl={this.props.flaskUrl} userId={this.props.userId}/>
            </React.Fragment>
          ))}
          </Card>
    );
  }



}