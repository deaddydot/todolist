import React from 'react';
import Form from 'react-bootstrap/Form'

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { display: 'block' };
        this.changeDisplay = this.changeDisplay.bind(this);
    }

    changeDisplay() {
        const newDisplay = this.state.display === 'block' ? 'none' : 'block';
        this.setState({ display: newDisplay });
    }

    render() {
      return (
        // <label><input type='checkbox' className='checkbox' value='value' />{this.props.task}</label>
        <Form.Check className='checkbox' type='checkbox' label={this.props.task} onClick={() => this.changeDisplay()} style={{display: this.state.display}}/>
      );
    }
}