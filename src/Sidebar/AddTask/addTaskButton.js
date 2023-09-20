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
    return (
      <>
        <button
          id="myBtn"
          onClick={this.modalOpen}
          style={{
            height: 100,
            width: "100%",
            backgroundColor: "var(--primary-color)",
            border: "none"
          }}
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
