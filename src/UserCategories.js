import React from 'react';
import axios from 'axios';

export default class UserCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
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

  handleCategoryChange(event) {
    const categoryId = event.target.value;
    this.props.onCategoryChange(categoryId);
  }

  render() {
    const { categories } = this.state;
    const { selectedCategoryId } = this.props;
    const currentCategory = categories.find(category => category.id === selectedCategoryId);
    const categoryOptions = categories.map(category => {
      if (category.id !== selectedCategoryId) {
        return(
          <option key={category.id} value={category.id}>{category.name}</option>
        );
      }
      else {
        return null;
      }
    });
  
    return (
      <>
        <label>
          Category:{" "}
          <select key="category-select" value={selectedCategoryId} onChange={this.handleCategoryChange}>
            {currentCategory && (
              <option key={currentCategory.id} value={currentCategory.id}>
                {currentCategory.name}
              </option>
            )}
            {!currentCategory && (
              <option key={'blank'} value={'blank'}>
                Select a category
              </option>
            )}
            {categoryOptions}
          </select>
        </label>
      </>
    );
  }  
}