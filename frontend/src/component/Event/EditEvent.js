import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "../../Styles/counter.css"; 
import Alert from "../Home/Alert"; 

const EditEvent = ({
  show,
  onHide,
  eventName,
  location: initialLocation,
  date: initialDate,
  time: initialTime,
  id,
}) => {
  const [formLocation, setFormLocation] = useState(initialLocation);
  const [formDate, setFormDate] = useState(initialDate);
  const [formTime, setFormTime] = useState(initialTime);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      location: formLocation,
      date: formDate,
      time: formTime,
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/Event/edit_event/${id}/`,
        formData
      );
      if (response.status === 200) {
        setMessage("Event updated successfully.");
      } else {
        setMessage("Failed to update event.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      setMessage("Error updating event. Please try again later.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered style={{ marginTop: "2%" }}>
      <Modal.Body>
        <div className="container-xxl py-2">
          <div className="text-center wow fadeInUp" data-wow-delay="0.5s">
            <h1 className="mb-0" style={{ fontSize: "3em" }}>
              Update Event {eventName}
            </h1>
            <hr />
          </div>
          <Alert />
          <form
            onSubmit={handleSubmit}
            className="row overflow-auto"
            style={{ maxHeight: "200px" }}
          >
            {message && (
              <div className="alert alert-success" role="alert">
                <p>{message}</p>
              </div>
            )}
            <div className="mb-3">
              <input
                placeholder={initialLocation}
                type="text"
                className="form-control rounded-5"
                id="location"
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                placeholder={initialDate}
                type="date"
                className="form-control rounded-5"
                id="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                placeholder={initialTime}
                type="time"
                className="form-control rounded-5"
                id="time"
                value={formTime}
                onChange={(e) => setFormTime(e.target.value)}
              />
            </div>
            <div className="text-end">
              <hr />
              <div className="mb-2">
                <button
                  className="btn btn-secondary rounded-5 me-2"
                  onClick={onHide}
                >
                  Cancel
                </button>
                <button className="btn btn-secondary rounded-5" type="submit">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditEvent;
