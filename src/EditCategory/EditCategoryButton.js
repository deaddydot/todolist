import React from 'react';
import EditCategoryForm from './EditCategoryForm';
import Button from 'react-bootstrap/Button';

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
    display: 'absolute',
    right: '1rem',
    top: '0',
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center'
  }

export default class EditCategoryButton extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {displayModal: false};
    
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

    render(){
        return(
            <>
            <Button size='sm' onClick={this.modalOpen} style={{backgroundColor: 'lightgrey', color: 'black', border: 'none', height: '2rem' }}>Edit Category</Button>
                {this.state.displayModal && (
                    <div className="myModal" style={ModalLooks} ref={(ref) => (this.modalRef = ref)}>
                        <div style={ModalContent} className="modal-content">
                            <div className="modal-header">
                                <h2>Edit Category</h2>
                                <span style={Close} className="close" onClick={this.modalClose}>&times;</span>
                            </div>
                            <EditCategoryForm flaskUrl={this.props.flaskUrl} taskId={this.props.taskId} modalOpen={this.modalOpen} />
                        </div>
                    </div>
                )}
            </>
        );
    }
}



