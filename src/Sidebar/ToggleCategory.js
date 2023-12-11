import React from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';

export default class ToggleCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: this.props.toggled
    }

    this.toggleCategory = this.toggleCategory.bind(this);
  }

  toggleCategory(category_id) {
    axios.post(`${this.props.flaskUrl}/category/toggle/${category_id}`)
      .catch(error => {
        console.log(error);
      });
    this.setState({ toggled: !this.state.toggled });
  }

  render() {
    return (
      <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: this.state.toggled ? `${this.props.color}` : 'grey' || 'var(--secondary-color)'}}>
        <Button style={{width: '100%', backgroundColor: 'transparent', border: 'none', color: 'black'}} onClick={() => this.toggleCategory(this.props.id)}>
          <h4>{this.props.name}</h4> 
        </Button>
      </ListGroup.Item>
    )
  }
}