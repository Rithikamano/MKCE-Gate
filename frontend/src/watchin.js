import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import CustomWebcam from './webcam';

const Watchin = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [headcount, setHeadcount] = useState('');
  const [department, setDepartment] = useState('');
  const [staff, setStaff] = useState('');
  const [reason, setReason] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [picture, setPicture] = useState(null);

  // Fetch staff names based on department
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        console.log("department in fetch", department);
        const response = await axios.post('http://localhost:8000/staff', { department });
        setStaffList(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };

    fetchStaff();
  }, [department]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to server along with the picture
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('headcount', headcount);
      formData.append('department', department);
      formData.append('staff', staff);
      formData.append('reason', reason);
      formData.append('picture', picture);
      console.log(formData.data);

      const response = await axios.post('http://localhost:8000/approval', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Form submitted successfully:', response.data);
      
      // Clear form inputs after successful submission
      setName('');
      setPhone('');
      setHeadcount('');
      setDepartment('');
      setStaff('');
      setReason('');
      setPicture(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <><CustomWebcam> </CustomWebcam><div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Name*
            </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="name"  value = {name} onChange={(e) => setName(e.target.value)} required/>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Mobile Numer*
          </label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="mobilenumber" value = {phone} onChange={(e) => setPhone(e.target.value)} required/>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Head Count*
          </label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="headcount" value = {headcount} onChange={(e) => setHeadcount(e.target.value)} required/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-auto">
            <label className="visually-hidden" htmlFor="autoSizingSelect">
              Department
            </label>
            <select className="form-select" id="department"value = {department} onChange={(e) => setDepartment(e.target.value)} required>
              <option selected="">Choose...</option>
              <option value="IT">IT</option>
              <option value="CSE">CSE</option>
              <option value="CIVIL">CIVIL</option>
              <option value="EEE">EEE</option>
              <option value="ECE">ECE</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-auto">
            <label className="visually-hidden" htmlFor="autoSizingSelect">
              Staff Name
            </label>
            <select className="form-select" id="staffname" value = {staff} onChange={(e) => setStaff(e.target.value)} required>
              <option selected="">Choose...</option>
              {staffList.map((staffName, index) => (
                <option key={index} value={staffName}>{staffName}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Reason
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="reason"  value = {reason} onChange={(e) => setReason(e.target.value)} required/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div></>

  );
};

export default Watchin;
