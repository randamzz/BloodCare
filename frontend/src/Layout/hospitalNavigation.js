import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/theme.css";

export function HospitalNavigation() {
  return (
    <>
      <li>
        <NavLink
          as={NavLink}
          to="/hospitals/list_blood/"
          exact="true"
          activeClassName="active"
        >
          Blood List
        </NavLink>
      </li>
      <li>
        <NavLink
          as={NavLink}
          to="/hospitals/list_blood_history"
          exact="true"
          activeClassName="active"
        >
          Mousaab
        </NavLink>
      </li>
      <li>
        <NavLink to="/alerte" exact activeClassName="active">
          Dashbord
        </NavLink>
      </li>
    </>
  );
}
