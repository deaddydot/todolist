import React from 'react';
import axios from 'axios';
import './Sidebar';
import ToggleCategory from './ToggleCategory';

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
        <ToggleCategory flaskUrl={this.props.flaskUrl} color={category.color} id={category.id} name={category.name} toggled={category.is_toggled} key={index} />
      );
    });

    return (
      <div style={{margin: '10px', borderRadius: '10px'}}>
        {categoryOptions}
      </div>
    )
  }
}