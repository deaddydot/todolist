import React from 'react';
import Form from 'react-bootstrap/Form'

export default class JsonCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      display: 'block',
      checked: false
    };
  }

  UNSAFE_componentWillReceiveProps () {
    if (!this.props.showAll) {
      this.setState({ display: 'block' });
    } else if (this.props.showAll && this.state.checked) {
      this.setState({ display: 'none' });
    }
  }

  changeDisplay() {
    const newState = !this.state.checked;
    this.setState({ checked: newState });
    if (!this.props.showAll && !this.state.checked) {
      const newDisplay = this.state.display === 'block' ? 'none' : 'block';
      this.setState({ display: newDisplay });
    }
  }

  render() {
    return (
      // <label><input type='checkbox' className='checkbox' value='value' />{this.props.task}</label>
      <div style={{display: this.state.display}} >
        <Form.Check className='checkbox' type='checkbox' label={this.props.label} onClick={() => this.changeDisplay()} />
        <p>Due: {this.props.deadline}</p>
      </div>
    );
  }
}