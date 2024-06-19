import React, { useState, useEffect } from "react";
import AlertForm from "./AlertForm";
import Alertlist from "./Alertlist";

const Main = () => {
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    if (refreshPage) {
      window.location.reload();
      setRefreshPage(false);
    }
  }, [refreshPage]);

  const handleAlertSubmitted = () => {
    setRefreshPage(true);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ marginLeft: "20px" }}>
         <Alertlist />
        </div>
        <div style={{ marginRight: "10px" }}>
          <AlertForm onAlertSubmitted={handleAlertSubmitted} />
        </div>
      </div>
    </div>
  );
};

export default Main;
