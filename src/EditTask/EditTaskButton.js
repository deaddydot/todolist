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
    float: 'left',
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center'
  }

export default class EditTaskButton extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {displayModal: false};
    
        this.modalopen = this.modalopen.bind(this);
    
    }
    
    modalopen() {
    const temp = !this.state.displayModal;
    this.setState({displayModal: temp})
    }
    render(){
        return(
            <>
            <Button size='sm' onClick={this.modalopen} style={{backgroundColor: 'lightgrey', color: 'black', border: 'none' }}>Edit</Button>
            {this.state.displayModal && (
            <div className="myModal" style={ModalLooks} /*onClick={this.modalopen}*/>
                <div /*className={styles.ModalContent}*/ style={ModalContent} className="modal-content">
                    <div className="modal-header">
                        <h2>Create Your Task</h2>
                        <span style={Close} className="close" onClick={this.modalopen}>&times;</span>
                    </div>
                    <EditTaskForm flaskUrl={this.props.flaskUrl} taskId={this.props.taskId}/>
                </div>
            </div>
        )}
            </>
        );
    }
}



