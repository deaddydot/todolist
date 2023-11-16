import React from "react";
import ReactDOM from 'react-dom'; // Import ReactDOM for createPortal
// import "./styles.css";
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
    const ModalContent = {
      backgroundColor: this.props.nightMode ? '#282A3A' : '#fefefe', // Set background color based on nightMode
      color: this.props.nightMode ? 'white' : 'black', // Set text color based on nightMode
      margin: '15% auto',
      padding: '20px',
      border: '1px solid #888',
      width: '80%'
    };
    return (
      <>
        <Button size='sm' onClick={this.modalOpen} style={{backgroundColor: 'lightgrey', color: 'black', border: 'none', height: '2rem' }}>+</Button>
        {this.state.displayModal && ReactDOM.createPortal( // Using React Portal
          <div className="myModal" style={ModalLooks}>
              <AddTaskFormByCategory
                flaskUrl={this.props.flaskUrl}
                modalClose={this.modalClose} // Pass modalClose as prop
                category={this.props.category}
                userId={this.props.userId}
                nightMode={this.props.nightMode}
              />
          </div>,
          document.body // Appending directly to body
        )}
      </>
    );
  }
}
