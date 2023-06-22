import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import "./../EditCategory/EditCategoryButton";



export default class DeleteCategoryButton extends React.Component {
  constructor(props) {
    super(props);

    this.deleteCategory = this.deleteCategory.bind(this); //Check this once backend is created
  }

  deleteCategory() {
    axios.delete(`${this.props.flaskUrl}/categories/${this.props.categoryId}`) //Check this as well

    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });

    this.props.modalOpen();

    window.location.reload();
  }

  modalOpen() {
    const temp = !this.state.displayModal;
    this.setState({displayModal: temp})
  }

  render() {
    return(
      <Button type="submit" onClick={this.deleteCategory} style={{backgroundColor:'red', border:'none'}}>Delete</Button>
    )
  }
}