import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import Login from "./component/Authentification/Login";
import Logout from "./component/Authentification/Logout";
import Register from "./component/Authentification/Register";
import Home from "./component/Home/Home";
import Main from "./component/Alert/Main";
import Chatbot from "./component/Chatbot/Chatbot";
import Geocode from "./component/Map/Geocode";
import UserDonation from "./component/userDonations/UserDonation";
import PlannedEventsList from "./component/Event/PlannedEventsList";
import EventDetailsPage from "./component/Event/EventDetailsPage";
import EventMain from "./component/Event/EventMain";
import BloodList from "./component/Hospital/bloodList";
import { Navigation } from "./Layout/navigations";
<<<<<<< HEAD
import NotFound from "./Layout/NotFound";
=======
import Dashboard from "./dashbord/Dashboard";

>>>>>>> 57ef3ddab8c4e5d03dcd665133bcb6be392a637f
import ListBloodHistory from "./component/Hospital/listbloodhistory";
import BloodTotalsPage from "./component/Hospital/BloodTotalsPage";

const AppContent = () => {


  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/yourDonations" element={<UserDonation />} />
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/logout" element={<Logout />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/alerte" element={<Main />} />
        <Route path="/geocode" element={<Geocode />} />
        <Route path="/event" element={<PlannedEventsList />} />
        <Route path="/Event/events/:eventId" element={<EventDetailsPage />} />
        <Route path="/add_events" element={<EventMain />} />
        <Route path="/hospitals/list_blood" element={<BloodList />} />
<<<<<<< HEAD
        <Route path="/hospitals/blood_totals" element={<BloodTotalsPage />} />
        <Route path="*" element={<NotFound />} />
=======
        <Route path="/dashbord" element={<Dashboard />} />

>>>>>>> 57ef3ddab8c4e5d03dcd665133bcb6be392a637f
        <Route
          path="/hospitals/list_blood_history"
          element={<ListBloodHistory />}
        />
<<<<<<< HEAD
        <Route path="/error" element={<NotFound />} />
=======
>>>>>>> 57ef3ddab8c4e5d03dcd665133bcb6be392a637f
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
