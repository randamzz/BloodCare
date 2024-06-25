import React, { useState, useEffect } from "react";

import PlannedEventsList from "./PlannedEventsList";
import Geocode from "../Map/Geocode";

const Main2 = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "50%", marginTop: "0%" }}>
      
        <Geocode />
      </div>
      <div style={{ width: "50%", marginTop: "0%" }}>
        <PlannedEventsList />
      </div>
    </div>
  );
};

export default Main2;
