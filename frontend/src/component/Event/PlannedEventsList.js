import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PlannedEventsList.css";
import Geocode from "../Map/Geocode";
import EditEvent from "./EditEvent";
import { Button } from "react-bootstrap";

const PlannedEventsList = () => {
  const [events, setEvents] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleUpdateModalOpen = () => {
    setShowUpdateModal(true);
  };

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/Event/liste_events/"
        );
        setEvents(response.data);
        console.log("Fetched events:", response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    if (!dateString) return "Time not available";
    const date = new Date(dateString);
    const options = { hour: "2-digit", minute: "2-digit" };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <div className="events-container">
      <h1 className="events-title">
        <span className="black-text">Planned</span>{" "}
        <span className="dark-red-text">Events!</span>{" "}
      </h1>
      <div className="row">
        <div className="col-md-6">
          <div className="events-list">
            {events.map((event) => (
              <div key={event.id} className="card m-4">
                <div className="content">
                  <p className="heading">{event.eventname}</p>
                  <p className="para">Location: {event.location}</p>
                  <p className="para">
                    Date: {formatDate(event.date_and_hour)}
                  </p>
                  <p className="para">
                    Time: {formatTime(event.date_and_hour)}
                  </p>
                  <Link
                    to={`/Event/events/${event.id}/`}
                    className="button type1"
                  >
                    Participate!
                  </Link>
                  <Button onClick={() => handleUpdateModalOpen()}>
                    Update
                  </Button>
                  {showUpdateModal && (
                    <EditEvent
                      show={showUpdateModal}
                      onHide={handleUpdateModalClose}
                      eventName={event.eventname}
                      location={event.location}
                      date={event.date_and_hour}
                      time={event.date_and_hour}
                      id={event.id}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <Geocode />
        </div>
      </div>
    </div>
  );
};

export default PlannedEventsList;
