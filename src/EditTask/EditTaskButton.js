import React from 'react';
import EditTaskForm from './EditTaskForm';
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

export default class EditTaskButton extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {displayModal: false};
    
        this.modalOpen = this.modalOpen.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }
    
    modalOpen() {
        const temp = !this.state.displayModal;
        this.setState({displayModal: temp});
    }

    modalClose() {
        const temp = !this.state.displayModal;
        this.setState({displayModal: temp});
        this.props.hideEditButton();
    }

    render(){
        return(
            <>
            <Button size='sm' onClick={this.modalOpen} style={{backgroundColor: 'lightgrey', color: 'black', border: 'none', height: '2rem' }}>Edit</Button>
                {this.state.displayModal && (
                    <div className="myModal" style={ModalLooks} /*onClick={this.modalopen}*/>
                        <div /*className={styles.ModalContent}*/ style={ModalContent} className="modal-content">
                            <div className="modal-header">
                                <h2>Edit Task</h2>
                                <span style={Close} className="close" onClick={this.modalClose}>&times;</span>
                            </div>
                            <EditTaskForm flaskUrl={this.props.flaskUrl} taskId={this.props.taskId} modalOpen={this.modalOpen} />
                        </div>
                    </div>
                )}
            </>
        );
    }
}



