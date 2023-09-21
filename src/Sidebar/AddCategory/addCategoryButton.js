import React from "react";
import "./AddCategoryButton.css";
import AddCategoryForm from "./AddCategoryForm";
import Button from 'react-bootstrap/Button';

const ModalLooks = {
  position: "fixed",
  zIndex: "1",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: 'flex', // Added
  justifyContent: 'center', // Added
  alignItems: 'center' // Added
};
const ModalContent = {
  backgroundColor: "#fefefe",
  margin: 'auto', // Changed from '15% auto'
  padding: '20px',
  border: '1px solid #888',
  width: '40%', // Could be more or less, depending on screen size
  display: 'flex', // Added
};

const Close = {
  color: '#aaa',
  position: 'absolute',
  right: '1rem',
  top: '1rem',
  fontSize: '28px',
  fontWeight: 'bold',
  cursor: 'pointer'

  // "&:hover": {
  //   background: "#efefef"
  //   color: black;
  //   text-decoration: none;
  //   cursor: pointer;
  // }
}

export default class AddCategoryButton extends React.Component {
  constructor(props){
    super(props);

    this.state = {displayModal: false};

    this.modalOpen = this.modalOpen.bind(this);

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
        <button id="myBtn" onClick={this.modalOpen} style={{height: 100, width: "100%", backgroundColor: "var(--primary-color)", border: "none"}}><h2>Add a Category</h2></button>
  
        {this.state.displayModal && (
          <div className="myModal" style={ModalLooks} ref={(ref) => (this.modalRef = ref)}>
          <div style={ModalContent} className="modal-content">
            <AddCategoryForm flaskUrl={this.props.flaskUrl} modalOpen={this.modalOpen} userId={this.props.userId} modalClose={this.modalClose}/>
          </div>
        </div>
        )}
      </>
    );
  }
}