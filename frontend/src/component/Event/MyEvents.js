import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyEvents.css";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import EditEvent from "./EditEvent"; 

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const associationName = Cookies.get("name");
  const [isAssociation, setIsAssociation] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [showEditModal, setShowEditModal] = useState(false); 

  useEffect(() => {
    const userType = Cookies.get("user_type");

    if (userType !== "association") {
      setIsAssociation(false);
    } else {
      fetchEvents();
    }
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:8000/Event/liste_events/"
      );
      const filtered = response.data.filter(
        (event) => event.association_or_hospital === associationName
      );
      setEvents(filtered);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Error fetching events");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedEvent(null);
    fetchEvents(); 
  };

  if (!isAssociation) {
    return <Navigate to="/error" />;
  }

  return (
    <div className="my-events-container">
      <h1 className="my-events-title">
        <span className="my-events-black-text">My</span>{" "}
        <span className="my-events-dark-red-text">Events</span>
      </h1>
      {loading && <p className="my-events-loading-text">Loading events...</p>}
      {error && <p className="my-events-error-text">{error}</p>}
      <div className="my-events-list">
        {events.map((event) => (
          <div key={event.id} className="my-events-card m-4">
            <div className="my-events-content">
              <p className="my-events-heading">{event.eventname}</p>
              <p className="my-events-para">Location: {event.location}</p>
              <p className="my-events-para">Date: {event.date_and_hour}</p>
              <Link
                to={`/Event/participants_details/${event.id}/`}
                className="my-events-link"
              >
                Participants
              </Link>
              <button
                onClick={() => handleEditClick(event)}
                className="btn btn-secondary mt-2"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <EditEvent
          show={showEditModal}
          onHide={handleEditModalClose}
          eventName={selectedEvent.eventname}
          location={selectedEvent.location}
          date={selectedEvent.date}
          time={selectedEvent.time}
          id={selectedEvent.id}
        />
      )}
    </div>
  );
};

export default MyEvents;
