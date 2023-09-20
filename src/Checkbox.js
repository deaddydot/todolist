import React from 'react';
import Form from 'react-bootstrap/Form';

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'block',
      checked: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.showAll !== prevProps.showAll) {
      if (!this.props.showAll) {
        this.setState({ display: 'block' });
      } else if (this.props.showAll && this.state.checked) {
        this.setState({ display: 'none' });
      }
    }
  }

  changeDisplay = () => {
    this.setState((prevState) => {
      const newState = !prevState.checked;
      let newDisplay = prevState.display;

      if (!this.props.showAll && newState) {
        newDisplay = 'none';
      } else {
        newDisplay = 'block';
      }

      return {
        checked: newState,
        display: newDisplay,
      };
    });
  };

  render() {
    return (
      <Form.Check
        className="checkbox"
        type="checkbox"
        label={this.props.task}
        onClick={this.changeDisplay}
        style={{ display: this.state.display }}
      />
    );
  }
}
