import React from 'react';
import { SketchPicker } from 'react-color';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import DeleteCategoryButton from './../DeleteCategory/DeleteCategoryButton';

export default class EditCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: "",
      name: "",
      color: "",
      user_id: 0,    // pass this down by props
    };
  }
  
  componentDidMount() {
    axios.get(`${this.props.flaskUrl}/categories/${this.state.user_id}`)
      .then(response => {
        const categories = response.data;
        const currentCategory = categories.find(category => category.name === this.props.category);
        this.setState({ category_id: currentCategory.id });
        axios.get(`${this.props.flaskUrl}/category/${currentCategory.id}`)
          .then(response => {
            const category = response.data;
            this.setState({
              category,
              name: category.name,
              color: category.color,
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });

  }
  
  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, color } = this.state;

    const data = {
      name,
      color,
    };
    try {
      const response = await axios.put(`${this.props.flaskUrl}/categories/${this.state.category_id}`, data);

      this.props.onCategoryAdded(response.data.category_id);
    } catch (error) {
      console.error(error);
    }

    this.props.modalOpen();

    window.location.reload();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { name, color } = this.state;

    return (
      <><form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange} 
          />
        </label>
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={color}
            onChange={this.handleChange} 
          />
        </label>
        <SketchPicker
          color={this.state.color}
          onChangeComplete={(color) => {
            this.setState({ color: color.hex });
          } } 
        />
        <div><Button style={{backgroundColor: 'blue', border: 'none', width: 200, margin: 20}} type="submit">Submit</Button>
        <DeleteCategoryButton flaskUrl={this.props.flaskUrl} taskId={this.props.taskId} modalOpen={this.props.modalOpen}/>
        </div>
        
      </form></>
    );
  }
}