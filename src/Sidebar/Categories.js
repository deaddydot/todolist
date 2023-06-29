import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import './Sidebar';

export default class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    // fetch categories from Flask API when component mounts
    axios.get(`${this.props.flaskUrl}/categories/${this.props.userId}`)
      .then(response => {
        this.setState({ categories: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const categoryOptions = this.state.categories.map((category, index) => {
      return(
        <ListGroup.Item className='text-center' style={{border: 'none', backgroundColor: `${category.color}` || 'var(--tertiary-color)'}}>
          <h4>{category.name}</h4>
        </ListGroup.Item>
      );
    });

    return (
      <div style={{margin: '10px', borderRadius: '10px'}}>
        {categoryOptions}
      </div>
    )
  }
}