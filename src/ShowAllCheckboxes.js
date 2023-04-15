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
      showAllButton.textContent = "Show all checkboxes";
    }
    else {
      if (this.props.view === 'completed') {
        showAllButton.textContent = "Hide unchecked checkboxes";
      }
      else {
        showAllButton.textContent = "Hide checked checkboxes";
      }
    }

    this.props.onClick();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showAll !== this.props.showAll) {
      const showAllButton = document.getElementById('show-all');

      if (this.props.showAll) {
        if (this.props.view === 'completed') {
          showAllButton.textContent = "Hide unchecked checkboxes";
        }
        else {
          showAllButton.textContent = "Hide checked checkboxes";
        }
      }
      else {
        showAllButton.textContent = "Show all checkboxes";
      }
    }
  }

  render() {
    return (
      <div id='show-all-div'>
        <Button id='show-all' onClick={() => this.handleChange()}>Show all checkboxes</Button>
      </div>
    );
  }
}