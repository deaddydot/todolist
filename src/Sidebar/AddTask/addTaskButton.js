import React from "react";
import "./styles.css";
import AddTaskForm from "./AddTaskForm";
//import styles from "./styles.css";

const ModalLooks = {
  //display: "block", /* Hidden by default */
  position: "fixed", /* Stay in place */
  zIndex: "1", /* Sit on top */
  left: "0",
  top: "0",
  width: "100%", /* Full width */
  height: "100%", /* Full height */
  overflow: "auto", /* Enable scroll if needed */
  backgroundColor: "rgb(0,0,0)", /* Fallback color */
  backgroundColor: "rgba(0,0,0,0.4)" /* Black w/ opacity */
}
const ModalContent = {
  backgroundColor: "#fefefe",
  margin: '15% auto', /* 15% from the top and centered */
  padding: '20px',
  border: '1px solid #888',
  width: '80%' /* Could be more or less, depending on screen size */
}
const Close = {
  color: '#aaa',
  float: 'left',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center'
}

export default class AddTaskButton extends React.Component {
  constructor(props){
    super(props);

    this.state = {displayModal: false};

    this.modalopen = this.modalopen.bind(this);

  }
modalopen() {
  const temp = !this.state.displayModal;
  this.setState({displayModal: temp})

  // const modal = document.querySelectorAll("myModal");
  // if (modal.style.display === 'none') {
  //   modal.style.display = 'block';
  // } else {
  //   modal.style.display = 'none';
  // }
}


// When the user clicks on <span> (x), close the modal
// spanclose() {
//   const modal = document.querySelectorAll("myModal");
//   modal.style.display = "none";
// }



  render() {
    return (
      <>
        <button id="myBtn" onClick={this.modalopen} style={{height: 100, width: "100%", backgroundColor: "var(--primary-color)", border: "none"}}><h2>Add a task</h2></button>
  
        {this.state.displayModal && (
          <AddTaskForm />
        )}
      </>
    );
    
  }
}
