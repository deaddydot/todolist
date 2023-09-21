import React from "react";
import "./styles.css";
import AddTaskForm from "./AddTaskForm";
import Button from 'react-bootstrap/Button';

const ModalLooks = {
  position: "fixed",
  zIndex: "1",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.4)"
};

const ModalContent = {
  backgroundColor: "#fefefe",
  margin: '15% auto',
  padding: '20px',
  border: '1px solid #888',
  width: '80%'
};

const Close = {
  color: '#aaa',
  position: 'absolute',
  right: '1rem',
  top: '0',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center'
};

export default class AddTaskButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayModal: false };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick, true);
  }
  
  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick, true);
  }
  

  handleOutsideClick = (event) => {
    const modalContent = document.querySelector(".modal-content");
    if (modalContent && !modalContent.contains(event.target)) {
      this.modalClose();
    }
  };
  

  modalOpen = () => {
    this.setState({ displayModal: true });
    document.body.style.overflow = 'hidden';
  };

  modalClose = () => {
    this.setState({ displayModal: false });
    document.body.style.overflow = 'hidden';
  };

  render() {
    const buttonStyle = {
      height: 100,
      width: "100%",
      border: "none",
      backgroundColor: this.props.nightMode ? '#282A3A' : '#C69749', // Set background color based on nightMode
      color: this.props.nightMode ? 'white' : 'black', // Assuming you want the text color to be white
    };
    return (
      <>
        <button
          id="myBtn"
          onClick={this.modalOpen}
          style={buttonStyle}
        >
          <h2>Add a task</h2>
        </button>
  
        {this.state.displayModal && (
          <AddTaskForm
            flaskUrl={this.props.flaskUrl}
            modalClose={this.modalClose}  // Pass modalClose instead of modalOpen
            userId={this.props.userId}
          />
        )}
      </>
    );
  }
  
}
