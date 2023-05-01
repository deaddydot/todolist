import React from 'react';
import Button from 'react-bootstrap/Button'

export default class ShowAllCheckboxes extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const showAllButton = document.getElementById('show-all');

    if (this.props.showAll) {
      showAllButton.textContent = "Show all tasks";
    }
    else {
      if (this.props.view === 'completed') {
        showAllButton.textContent = "Hide unchecked tasks";
      }
      else {
        showAllButton.textContent = "Hide checked tasks";
      }
    }

    this.props.onClick();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showAll !== this.props.showAll) {
      const showAllButton = document.getElementById('show-all');

      if (this.props.showAll) {
        if (this.props.view === 'completed') {
          showAllButton.textContent = "Hide unchecked tasks";
        }
        else {
          showAllButton.textContent = "Hide checked tasks";
        }
      }
      else {
        showAllButton.textContent = "Show all tasks";
      }
    }
  }

  render() {
    return (
      <div id='show-all-div'>
        <Button id='show-all' onClick={() => this.handleChange()}>Show all tasks</Button>
      </div>
    );
  }
}