import React from "react";
import "./Settings.css";
import SettingsForm from "./SettingsForm";
import Button from 'react-bootstrap/Button';






export default class SettingsButton extends React.Component {
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
    const modalContent = document.querySelector(".add-task-form");
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
      //fontWeight: "bold"    //doesn't work for some reason
    };
    return (
      <>
        <button
          id="myBtn"
          onClick={this.modalOpen}
          style={buttonStyle}
          // margin={50}
        >
          <h2>Settings</h2>
        </button>
  
        {this.state.displayModal && (
          <SettingsForm
            flaskUrl={this.props.flaskUrl}
            modalClose={this.modalClose}  // Pass modalClose instead of modalOpen
            userId={this.props.userId}
            nightMode={this.props.nightMode}
          />
        )}
      </>
    );
  }
  
}