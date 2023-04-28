import React from 'react';
import axios from 'axios';

export default class UserCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategoryId: "",
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
    this.setState({ selectedCategoryId: categoryId });
    this.props.onCategoryChange(categoryId);
  }

  render() {
    const categoryOptions = this.state.categories.map(category => (
      <option key={category.id} value={category.id}>{category.name}</option>
    ));

    return (
      <>
        <label>
          Category:
          <select key="category-select" value={this.state.selectedCategoryId} onChange={this.handleCategoryChange}>
            <option value="">Select a category...</option>
            {categoryOptions}
          </select>
        </label>
      </>
    );
  }
}