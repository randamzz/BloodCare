import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import YourActivity from "./YourActivity";
import PopularEvents from "./PopularEvents";
import Donations from "./Donations";
import "../Styles/styles.min.css" ;

const Dashboard = () => {
  return (
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      {/* Sidebar 
      <Sidebar />*/}

      {/* Main content */}
      <div className="body-wrapper">
        {/* Navbar 
        <Navbar />*/}

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 d-flex align-items-strech">
              <YourActivity />
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <Donations />
                </div>
              </div>
            </div>
          </div>
          <PopularEvents />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
