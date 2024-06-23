import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/theme.css";

export function AssociationNavigation() {
  return (
    <>
      <li>
        <NavLink to="/event" exact activeClassName="active">
          Events
        </NavLink>
      </li>
      <li>
        <NavLink to="/add_events" exact activeClassName="active">
          Create Event
        </NavLink>
      </li>
      <li>
        <NavLink to="/myevents" exact activeClassName="active">
          My Events
        </NavLink>
      </li>
    </>
  );
}
