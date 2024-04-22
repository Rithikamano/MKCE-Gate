import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Staff = () => {
  let staffName = "Murugesan";
  const [nameList, setName] = useState([]);
  const [pictureList, setPic] = useState([]);
  const [headcountList, setHeadcount] = useState([]);
  const [reasonList, setReason] = useState([]);
  const [idList, setId] = useState([]);
  const [exitappList, setExit] = useState([]);

  const [showTable1, setShowTable1] = useState(false);
  const [showTable2, setShowTable2] = useState(false);
  const [showTable3, setShowTable3] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const exitApprovalToast = () => {
    toast.success("Exit Approved!");
  };

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
  const fetchPageData = async (staffName) => {
    try {
      const response = await axios.post("http://localhost:8000/admin", {
        staffName,
      });

      setName(response.data.visitorNames.reverse());
      setHeadcount(response.data.headcnts.reverse());
      setPic(response.data.visitorPics.reverse());
      setReason(response.data.visitorReasons.reverse());
      setId(response.data.id.reverse());
      setExit(response.data.exitApproval.reverse());
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };
  const handleApproval = async (id, index) => {
    try {
      await axios.post(
        "http://localhost:8000/exitApproval",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      exitappList[index] = 1;
      fetchPageData(staffName);
      exitApprovalToast();
    } catch (error) {
      console.error("Error Approving", error);
    }
  };

  const approvedButtonStyle = {
    padding: "10px 60px",
    borderRadius: "50px",
    backgroundColor: "#e03822",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    outline: "none",
  };
  const yeahButtonStyle = {
    padding: "10px 60px",
    borderRadius: "50px",
    backgroundColor: "#60DF51",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    outline: "none",
  };

  // Fetch page data names based on department
  useEffect(() => {
    let staffName = "Murugesan";

    fetchPageData(staffName);
  }, [staffName]);

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2>My Visitors</h2>
      <br />
      <Table striped hover>
        <tbody>
          {/* Rows of visitors */}
          {nameList.map((name, index) => (
            <tr key={index}>
              {" "}
              {/* Don't forget to add a unique key to each row */}
              <td>
                <img
                  src={pictureList[index]}
                  alt="profile"
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
              </td>
              {headcountList[index] > 1 ? (
                <td>
                  <b>{name}</b> along with <b>{headcountList[index] - 1}</b>{" "}
                  members is waiting to see you for <b>{reasonList[index]}</b>.
                  Have met them?
                </td>
              ) : (
                <td>
                  <b>{name}</b> is waiting to see you for{" "}
                  <b>{reasonList[index]}</b>. Have you met them?
                </td>
              )}
              <td>
                {exitappList[index] === 0 ? (
                  <>
                    <Button
                      style={yeahButtonStyle}
                      variant="primary"
                      onClick={() => handleApproval(idList[index], index)}
                    >
                      Yeah
                    </Button>
                  </>
                ) : (
                  <>
                    <Button style={approvedButtonStyle} variant="primary">
                      Exit Approved
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <br />
      <hr />
      <h2>List</h2>
      <br />
      <div className="button-container">
        {/* Buttons to toggle tables */}
        <Button style={buttonStyle} variant="primary" onClick={toggleTable1}>
          view visitors
        </Button>
        <Button style={buttonStyle} variant="primary" onClick={toggleTable2}>
          Approval - waiting{" "}
        </Button>
        <Button style={buttonStyle} variant="primary" onClick={toggleTable3}>
          In Campus
        </Button>
        <Button style={buttonStyle} variant="primary" onClick={toggleTable4}>
          Generate Record
        </Button>
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
              </tr>
            </thead>
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
              </tr>
            </thead>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tbody>{/* Table 2 rows */}</tbody>
          </Table>
        )}
        {showTable3 && (
          <Table striped hover>
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
              </tr>
            </thead>
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
              VISITORS RECORD
            </Modal.Title>
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
  marginLeft: "60px", // Add margin-left property here
  padding: "10px 70px",
  borderRadius: "50px",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: "#39BED3",
  color: "white",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  outline: "none",
};

export default Staff;
