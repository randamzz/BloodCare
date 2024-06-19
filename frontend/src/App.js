import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/Authentification/Login";
import Logout from "./component/Authentification/Logout";
import Register from "./component/Authentification/Register";
import Home from "./component/Home/Home";
import Main from "./component/Alert/Main";
import Chatbot from "./component/Chatbot/Chatbot";
import Geocode from "./component/Map/Geocode";
import UserDonation from "./component/userDonations/UserDonation";
import React from "react";
import PlannedEventsList from "./component/Event/PlannedEventsList";
import EventDetailsPage from "./component/Event/EventDetailsPage";
import EventMain from "./component/Event/EventMain";
import BloodList from "./component/Hospital/bloodList"; 
import { Navigation } from "./Layout/navigations";

import ListBloodHistory from "./component/Hospital/listbloodhistory";

// définir les routes d application
const App = () => {
  return (
    <Router>
      <Navigation />

      <Routes>
        <Route path="/yourDonations" element={<UserDonation />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/user/login/" element={<Login />} />
        <Route path="/user/logout/" element={<Logout />} />
        <Route path="/user/register/" element={<Register />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/alerte" element={<Main />} />
        <Route path="/geocode" element={<Geocode />} />
        <Route path="/event" element={<PlannedEventsList />} />
        <Route path="/Event/events/:eventId/" element={<EventDetailsPage />} />
        <Route path="/add_events" element={<EventMain />} />
        <Route path="/hospitals/list_blood" element={<BloodList />} />
        <Route path="/hospitals/list_blood_history" element={<ListBloodHistory />} />
      </Routes>
    </Router>
  );
};
export default App;
