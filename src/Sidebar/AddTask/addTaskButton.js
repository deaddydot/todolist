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
  width: '80%', /* Could be more or less, depending on screen size */
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

    this.modalOpen = this.modalOpen.bind(this);

  }

  modalOpen() {
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
        <button id="myBtn" onClick={this.modalOpen} style={{height: 100, width: "100%", backgroundColor: "var(--primary-color)", border: "none"}}><h2>Add a task</h2></button>
  
        {this.state.displayModal && (
          <div className="myModal" style={ModalLooks} /*onClick={this.modalopen}*/>
          <div /*className={styles.ModalContent}*/ style={ModalContent} className="modal-content">
            <div className="modal-header">
              <h2>Create Your Task</h2>
              <span style={Close} className="close" onClick={this.modalOpen}>&times;</span>
            </div>
            <AddTaskForm flaskUrl={this.props.flaskUrl} modalOpen={this.modalOpen} />
          </div>
        </div>
        )}
      </>
    );
    
  }
}
