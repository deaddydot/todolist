import React from 'react';
import Button from 'react-bootstrap/Button'

export default class ShowAllCheckboxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show_all_enabled: false };
  }

  showAll() {
    this.state.show_all_enabled = !this.state.show_all_enabled;

    const checkboxes = document.getElementsByClassName('checkbox');
    console.log(checkboxes.length);
    const showAllButton = document.getElementById('show-all');

    if (this.state.show_all_enabled) {
      console.log('hide');
      showAllButton.innerHTML = "Hide checked checkboxes";
      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].style.display = 'block';
      }
    }
    else {
      console.log('show');
      showAllButton.innerHTML = "Show checked checkboxes";
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].state.checked) {
          console.log('none');
          checkboxes[i].style.display = 'none';
        }
      }
    }
  }

  render() {
    return (
      <div id='show-all-div'>
        <Button id='show-all' onClick={ () => this.showAll() }>Show all checkboxes</Button>
      </div>
    );
  }
}