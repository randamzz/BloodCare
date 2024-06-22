import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/theme.css";

export function CitizenNavigation() {
  return (
    <>
      <li>
        <NavLink to="/event" exact activeClassName="active">
          Events
        </NavLink>
      </li>
      <li>
        <NavLink to="/yourDonations" exact activeClassName="active">
          Your Donations
        </NavLink>
      </li>
    </>
  );
}
