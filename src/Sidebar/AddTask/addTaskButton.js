import React from 'react';
import "./../Sidebar.css";

export default class AddTaskButton extends React.Component {
  constructor(props){
    super(props);

    this.state = {displayModal: false};

    this.modalopen = this.modalopen.bind(this);
  }
modalopen() {
  const temp = !this.state.displayModal;
  this.setState({displayModal: temp})
}

// When the user clicks on <span> (x), close the modal
spanclose() {
  const modal = document.querySelector("myModal");
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
  // onclick(event) {
  //   var modal = document.getElementById("myModal");
  //   if (event.target === modal) {
  //     modal.style.display = "none";
  //   }
  // }

  render() {
    return (
      <div>
      
        <div>
          <button style={{height: 100, width: '100%', backgroundColor: 'var(--primary-color)', border: 'none'}} id="myBtn" onClick={this.modalopen}>Add a Task</button>
          {this.state.displayModal && (
          <div id="myModal">
              <div className="modal-content">
                <span className="close">&times;</span>
                  <p className="title">
                      What is the task?: <input type="text" id="task" placeholder="Task here"/>
                  </p>
              </div>
          </div>
          )}
        </div>
      </div>
    )
  }
}

