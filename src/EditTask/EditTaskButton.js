import React from 'react';
import EditTaskForm from './EditTaskForm';
import Button from 'react-bootstrap/Button';
import ReactDOM from 'react-dom';

const ModalLooks = {
    //display: "block", /* Hidden by default */
    position: "fixed", /* Stay in place */
    zIndex: "1", /* Sit on top */
    left: "0",
    top: "0",
    width: "100%", /* Full width */
    height: "100%", /* Full height */
    overflow: "auto", /* Enable scroll if needed */
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


export default class EditTaskButton extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {displayModal: false};
    
        this.modalOpen = this.modalOpen.bind(this);
        //this.modalClose = this.modalClose.bind(this);
    }
    
      
    componentDidMount() {
        document.addEventListener("click", this.handleOutsideClick, true);
      }
      
    componentWillUnmount() {
        document.removeEventListener("click", this.handleOutsideClick, true);
    }
    

    handleOutsideClick = (event) => {
        const modalContent = document.querySelector(".edit-task-form");
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

        const ModalContent = {
            backgroundColor: this.props.nightMode ? '#282A3A' : 'white',
            color: this.props.nightMode ? 'white' : 'black',
            border: '1px solid #888',
            width: '30%',
          };

        return(
            <>
            <Button size='sm' onClick={this.modalOpen} style={{backgroundColor: 'lightgrey', color: 'black', border: 'none', height: '2rem' }}>✎</Button>
            {this.state.displayModal && ReactDOM.createPortal(
            <div style={ModalLooks}>
                <EditTaskForm 
                    flaskUrl={this.props.flaskUrl} 
                    taskId={this.props.taskId} 
                    //modalOpen={this.modalOpen} 
                    userId={this.props.userId} 
                    nightMode={this.props.nightMode} 
                    modalClose={this.modalClose}
                />
            </div>,
            document.body
            )}
            </>
        );
    }
}



