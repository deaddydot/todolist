import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM for portals
import EditCategoryForm from './EditCategoryForm';
import Button from 'react-bootstrap/Button';

const ModalLooks = {
  position: "fixed", // Position fixed to cover the whole screen
  zIndex: "1000", // High z-index
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(0,0,0,0.4)"
};

const ModalContent = {
  backgroundColor: "#fefefe",
  margin: '15% auto',
  padding: '20px',
  border: '1px solid #888',
  width: '40%',
};

const Close = {
  color: '#aaa',
  float: 'right',
  fontSize: '28px',
  fontWeight: 'bold',
};

export default class EditCategoryButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { displayModal: false };

    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
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
        <Button size='sm' onClick={this.modalOpen} style={{ backgroundColor: 'lightgrey', color: 'black', border: 'none', height: '2rem' }}>✎</Button>
        {this.state.displayModal && ReactDOM.createPortal( // Using React Portal
          <div className="myModal" style={ModalLooks} ref={(ref) => (this.modalRef = ref)}>
            <div style={ModalContent} className="modal-content">
              <EditCategoryForm flaskUrl={this.props.flaskUrl} category={this.props.category} modalOpen={this.modalOpen} modalClose={this.modalClose} userId={this.props.userId} />
            </div>
          </div>,
          document.body // Appending directly to body
        )}
      </>
    );
  }
}
