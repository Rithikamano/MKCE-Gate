import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { BsCircleFill } from 'react-icons/bs';

const Staff = () => {
  const [showTable1, setShowTable1] = useState(false);
  const [showTable2, setShowTable2] = useState(false);
  const [showTable3, setShowTable3] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleTable1 = () => {
    setShowTable1(true);
    setShowTable2(false);
    setShowTable3(false);
  };

  const toggleTable2 = () => {
    setShowTable1(false);
    setShowTable2(true);
    setShowTable3(false);
  };

  const toggleTable3 = () => {
    setShowTable1(false);
    setShowTable2(false);
    setShowTable3(true);
  };

  const toggleTable4 = () => {
    setShowTable1(false);
    setShowTable2(false);
    setShowTable3(false);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const yeahButtonStyle = {
    padding: '10px 60px',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#60DF51', // Change the color to red
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    outline: 'none',
  };

  return (
    <div className="container mt-4">
      <h2>List</h2>
      <br />
      <div className="button-container"> 
        {/* Buttons to toggle tables */}
        <Button style={buttonStyle} variant="primary" onClick={toggleTable1}>view visitors</Button>
        <Button style={buttonStyle} variant="primary" onClick={toggleTable2}>Approval - waiting </Button>
        <Button style={buttonStyle} variant="primary" onClick={toggleTable3}>In Campus</Button>
        <Button style={buttonStyle} variant="primary" onClick={toggleTable4}>Generate Record</Button>
      </div>
      <hr />

      {/* Tables */}
      <div>
        {showTable1 && (
          <Table striped hover>
            {/* Table 1 content */}
            <thead>
              <tr>
                <th>ID</th>
                <th>VISITER NAME</th>
                <th>PHOTO</th>
                <th>HEAD COUNT</th>
                <th>MOBILE NUMBER </th>
                <th>REASON </th>
                <th>INTIME</th>
                <th>OUTTIME</th>
              </tr></thead>
              <tr>
                <td>1</td>
                <td>rithika</td>
                <td>null</td>
                <td>2</td>
                <td>8248042949</td>
                <td>paper work</td>
                <td>9:12</td>
                <td>10:00</td>

              </tr>
            
          </Table>
        )}
        {showTable2 && (
          <Table striped hover>
            {/* Table 2 content */}
            <thead>
              <tr>
              <th>ID</th>
                <th>VISITER NAME</th>
                <th>PHOTO</th>
                <th>HEAD COUNT</th>
                <th>MOBILE NUMBER </th>
                <th>REASON </th>
                <th>INTIME</th>
              </tr></thead>
              <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>

              </tr>
              
              <tbody>
              {/* Table 2 rows */}
              </tbody>
          </Table>
        )}
        {showTable3 && (
          <Table striped  hover>
            {/* Table 3 content */}
            <thead>
              <tr>
                <th>ID</th>
                <th>VISITER NAME</th>
                <th>PHOTO</th>
                <th>HEAD COUNT</th>
                <th>MOBILE NUMBER </th>
                <th>REASON </th>
                <th>INTIME</th>
                <th>OUTTIME</th>
              </tr></thead>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
          </Table>
        )}
        {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {/* <img src="C:\xampp\htdocs\gate_one\frontend\public\mkce.logo1.png" style={{ marginRight: '0px' }} /> */}
      VISITORS RECORD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Date Selection</h6>
          <br />
          <Form>
            <Form.Group controlId="fromDate">
              <Form.Label>From</Form.Label>
              <Form.Control type="date" placeholder="Enter From Date" />
            </Form.Group>
          <br />
            <Form.Group controlId="toDate">
              <Form.Label>To</Form.Label>
              <Form.Control type="date" placeholder="Enter To Date" />
            </Form.Group>
          </Form>
          <br />
          <br />

        </Modal.Body>
      </Modal>
      </div>
    </div>
  );
};

const buttonStyle = {
  marginLeft: '60px', // Add margin-left property here
  padding: '10px 70px',
  borderRadius: '50px', 
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: '#39BED3', 
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
  outline: 'none', 

};


export default Staff;


