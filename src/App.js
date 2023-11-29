import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row, Card, Form, Button } from 'react-bootstrap';
// import Cookies from 'js-cookie';
// import axios from 'axios';
import './App.css';

function App() {




  return (
    // <div className="App">
    //   <header className="App-header">
    //   <p>
    //     CRUD operations
    //   </p>
    //   <button className="create" style={{padding: 5, color: "black", width: 80}}>
    //     Create
    //   </button>
    //   <button className="read" style={{padding: 5, color: "black", width: 80}}>
    //     Read
    //   </button>
    //   <button className="update" style={{padding: 5, color: "black", width: 80}}>
    //     Update
    //   </button>
    //   <button className="delete" style={{padding: 5, color: "black", width: 80}}>
    //     Delete
    //   </button>
      
    //   </header>
      
    // </div>
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container fluid={true} style={{flex: '1' }}>
          <Row >
            <Col style={{paddingLeft: '20', paddingRight: '20' ,borderStyle:'solid'}}>
              <p style={{fontWeight: "bold", fontSize:"25px"}}>
                Company Name
              </p>
            </Col>
            <Col style={{paddingLeft: '0', paddingRight: '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                <div>
                  <Button style={{ backgroundColor: 'lightgrey', borderColor:'black', color: 'black', padding:'10px' }}>
                    Create
                  </Button>
                  <Button style={{ backgroundColor: 'lightgrey', borderColor:'black', color: 'black', marginLeft: '0.5rem', padding:'10px' }}>
                    Read
                  </Button>
                  <Button style={{ backgroundColor: 'lightgrey', borderColor:'black', color: 'black', marginLeft: '0.5rem', padding:'10px' }}>
                    Update
                  </Button>
                  <Button style={{ backgroundColor: 'lightgrey', borderColor:'black', color: 'black', marginLeft: '0.5rem', padding:'10px' }}>
                    Delete
                  </Button>
                </div>
              </div>    
            </Col>
          </Row>
        </Container>
      </div>

  );
}

export default App;
