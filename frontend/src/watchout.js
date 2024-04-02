import React, { useState } from 'react';
import axios from 'axios';

const Watchout = () => {
  const [tokenId, setTokenId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic here
  };

  return (
    <div>
      <h2>Status Checking</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="tokenId" className="col-sm-2 col-form-label">Enter Token Id*</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="tokenId"
              placeholder="Enter Pass Id here"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Watchout;
