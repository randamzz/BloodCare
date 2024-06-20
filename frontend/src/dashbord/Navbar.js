import React from "react";

const Navbar = () => {
  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link nav-icon-hover">
              <i className="ti ti-bell-ringing"></i>
              <div className="notification bg-primary rounded-circle"></div>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link nav-icon-hover"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="../assets/images/profile/user-1.jpg"
                alt=""
                width="35"
                height="35"
                className="rounded-circle"
              />
            </a>
            <div
              className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
              aria-labelledby="drop2"
            >
              <a className="d-flex align-items-center gap-2 dropdown-item">
                <i className="ti ti-user fs-6"></i>
                <p className="mb-0 fs-3">My Profile</p>
              </a>
              <a
                href="./authentication-login.html"
                className="btn btn-outline-primary mx-3 mt-2 d-block"
              >
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
