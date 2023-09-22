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
    const buttonStyle = {
      height: 100,
      width: "100%",
      border: "none",
      backgroundColor: this.props.nightMode ? '#282A3A' : '#C69749', // Set background color based on nightMode
      color: this.props.nightMode ? 'white' : 'black', // Assuming you want the text color to be white
    };

    const FormStyle = {
      width: "30%",
      backgroundColor: this.props.nightMode ? '#282A3A' : 'white', // Set background color based on nightMode
      color: this.props.nightMode ? 'white' : 'black', // Assuming you want the text color to be white
      margin: 'auto', // Changed from '15% auto'
      padding: '20px',
      border: '1px solid #888',
      display: 'flex', // Added
    };
    return (
      <>
        <button id="myBtn" onClick={this.modalOpen} style={buttonStyle}><h2>Add a Category</h2></button>
  
        {this.state.displayModal && (
          <div className="myModal" style={ModalLooks} ref={(ref) => (this.modalRef = ref)}>
          <div style={FormStyle} className="modal-content">
            <AddCategoryForm flaskUrl={this.props.flaskUrl} modalOpen={this.modalOpen} userId={this.props.userId} modalClose={this.modalClose} nightMode={this.props.nightMode}/>
          </div>
        </div>
        )}
      </>
    );
  }
}