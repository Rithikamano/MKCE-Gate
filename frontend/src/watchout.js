import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import crossImg from "./cross.svg";
import tickImg from "./tick.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Watchout = () => {
  const [modalData, setModalData] = useState({
    inTime: "",
    name: "",
    staffName: "",
    personAccompanied: "",
    exitApprovalValue: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [tokenId, setTokenId] = useState("");

  const idWrongToast = () => {
    toast("Invalid Token Id");
  };
  const fetchModalData = async (tokenId) => {
    const response = await axios.post("http://localhost:8000/tokenId", {
      tokenId,
    });

    if (response.data.length !== 0) {
      setModalData({
        inTime: response.data[0].inTime ?? "",
        name: response.data[0].name ?? "",
        staffName: response.data[0].staffName ?? "",
        personAccompanied: response.data[0].headcount ?? "",
        exitApprovalValue: response.data[0].exitApproval ?? "",
      });

      setShowModal(true);
    } else {
      idWrongToast();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchModalData(tokenId);
  };

  return (
    <div className="row">
      <ToastContainer />
      <div className="col-md-12">
        <div className="card">
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="card-body">
              <h4 className="card-title">Status check</h4>
              <div className="form-group row">
                <label
                  htmlFor="passId"
                  className="col-sm-3 text-start control-label col-form-label"
                >
                  Enter pass ID
                </label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    id="tokenId"
                    name="tokenId"
                    placeholder="Enter pass ID Here"
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                    required
                  />
                </div>
              </div>
              <br />
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <br />
          <Modal.Title>MKCE Invitation Pass</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th className="text-start fw-bold">In Time</th>
                <td>{modalData.inTime}</td>
              </tr>
              <tr>
                <th className="text-start fw-bold">Name</th>
                <td>{modalData.name}</td>
              </tr>
              <tr>
                <th className="text-start fw-bold">Staff Name</th>
                <td>{modalData.staffName}</td>
              </tr>
              <tr>
                <th className="text-start fw-bold">Person Accompanied</th>
                <td>{modalData.personAccompanied}</td>
              </tr>
            </tbody>
          </table>
          <br />
          {modalData.exitApprovalValue == "1" ? (
            <div className="text-center">
              <img
                src={tickImg}
                alt="Exit Approved"
                width="100"
                height="100"
              ></img>
            </div>
          ) : (
            <div className="text-center">
              <img
                src={crossImg}
                alt="Not Approved"
                width="100"
                height="100"
              ></img>
            </div>
          )}

          <div className="text-center mt-3">
            <Button
              variant="secondary"
              className="mx-2"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
            <Button variant="primary">Call Staff</Button>
          </div>
          <br />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Watchout;
