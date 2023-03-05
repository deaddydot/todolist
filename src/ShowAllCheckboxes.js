import React from 'react';
import Button from 'react-bootstrap/Button'

export default class ShowAllCheckboxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showAll: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const newState = !this.state.showAll;
    this.setState({ showAll: newState });
    const showAllButton = document.getElementById('show-all');

    if (this.state.showAll) {
      showAllButton.innerHTML = "Hide checked checkboxes";
    }
    else {
      showAllButton.innerHTML = "Show all checkboxes";
    }

    this.props.onClick();
  }

  render() {
    return (
      <div id='show-all-div'>
        <Button id='show-all' onClick={() => this.handleChange()}>Show all checkboxes</Button>
      </div>
    );
  }
}