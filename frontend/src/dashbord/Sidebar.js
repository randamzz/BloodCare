import React from "react";

const Sidebar = () => {
  return (
    <aside className="left-sidebar">
      <div className="brand-logo d-flex align-items-center justify-content-between">
        <a href="./index.html" className="text-nowrap logo-img">
          <img src="../assets/images/logos/dark-logo.svg" width="180" alt="" />
        </a>
        <div
          className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
          id="sidebarCollapse"
        >
          <i className="ti ti-x fs-8"></i>
        </div>
      </div>
      <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
        <ul id="sidebarnav">
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="./index.html"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-layout-dashboard"></i>
              </span>
              <span className="hide-menu">Dashboard</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="./ui-buttons.html"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-article"></i>
              </span>
              <span className="hide-menu">My Events</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="./ui-alerts.html"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-alert-circle"></i>
              </span>
              <span className="hide-menu">New Event</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="./authentication-login.html"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-login"></i>
              </span>
              <span className="hide-menu">Share Emergency</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
