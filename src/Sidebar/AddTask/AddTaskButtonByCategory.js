import React from "react";
import "./styles.css";
import AddTaskFormByCategory from "./AddTaskFormByCategory";
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

export default class AddTaskButtonByCategory extends React.Component {
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
  };

  modalClose = () => {
    this.setState({ displayModal: false });
  };

  render() {
    return (
      <>
        <button
          id="myBtn"
          onClick={this.modalOpen}
          style={{
            ...this.props.style,
            backgroundColor: "var(--secondary-color)",
            border: "none",
            margin: '1rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <p style={{ margin: '0.1rem' }}>+</p>
        </button>
  
        {this.state.displayModal && (
          <div className="myModal" style={ModalLooks} ref={(ref) => (this.modalRef = ref)}>
            <div style={ModalContent} className="modal-content">
              <div className="modal-header">
                <h2>Create Your Task</h2>
                <span style={Close} className="close" onClick={this.modalClose}>
                  &times;
                </span>
              </div>
              <AddTaskFormByCategory
                flaskUrl={this.props.flaskUrl}
                modalOpen={this.modalOpen}
                category={this.props.category}
                userId={this.props.userId}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}
