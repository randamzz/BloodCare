import React from "react";

const YourActivity = () => {
  return (
    <div className="card w-100">
      <div className="card-body">
        <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
          <div className="mb-3 mb-sm-0">
            <h5 className="card-title fw-semibold">Your Activity</h5>
          </div>
          <div>
            <select className="form-select">
              <option value="1">June 2024</option>
            </select>
          </div>
        </div>
        <div id="chart"></div>
      </div>
    </div>
  );
};

export default YourActivity;
