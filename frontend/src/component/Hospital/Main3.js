import React, { useState, useEffect } from "react";

import BloodHistory from "./bloodHistory";
import BloodList from "./bloodList";

const Main3 = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "50%", marginTop: "2%" }}>
        <center>
          {" "}
          <h1> Blood Stock</h1>
        </center>

        <BloodList />
      </div>
      <div style={{ width: "50%", marginTop: "1%" }}>
        <center>
          {" "}
          <h1> Your Latest Actions</h1>
        </center>
        <BloodHistory />
      </div>
    </div>
  );
};

export default Main3;
