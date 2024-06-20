import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./EventDetailsPage.css";
import Cookies from "js-cookie";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [email, setEmail] = useState(Cookies.get("user_email"));
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (eventId) {
          console.log(`Fetching event details for event ID: ${eventId}`);
          const response = await axios.get(
            `http://localhost:8000/Event/events/${eventId}/`
          );
          console.log("Event details fetched:", response.data);
          setEventDetails(response.data);

          const location = response.data.location;
          const geocodeResponse = await axios.get(
            `https://nominatim.openstreetmap.org/search`,
            {
              params: {
                q: location,
                format: "json",
                limit: 1,
              },
            }
          );

          if (geocodeResponse.data.length > 0) {
            const { lat, lon } = geocodeResponse.data[0];
            setCoordinates([lat, lon]);
          }

          setLoading(false);
        } else {
          setError(new Error("Event ID not provided"));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/Event/api/events/${eventId}/submit_email/`,
        {
          email: email,
        }
      );
      setSuccessMessage(
        "Email submitted successfully. Check your inbox for the ticket!"
      );
      setEmail("");
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
    setSubmitting(false);
  };

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div>Error fetching event details: {error.message}</div>;

  return (
    <div className="event-details-container">
      {eventDetails ? (
        <div style={{ paddingTop: "40px" }} className="event-details">
          <h1>{eventDetails.eventname}</h1>
          <p>__________________________________________________________</p>

          <p>Location: {eventDetails.location}</p>
          <p>Association: {eventDetails.association_or_hospital}</p>
          <p>
            Date: {new Date(eventDetails.date_and_hour).toLocaleDateString()}
          </p>
          <p>
            Time: {new Date(eventDetails.date_and_hour).toLocaleTimeString()}
          </p>

          {coordinates && (
            <MapContainer
              center={coordinates}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={coordinates}>
                <Popup>{eventDetails.location}</Popup>
              </Marker>
            </MapContainer>
          )}

          <div style={{ paddingTop: "20px" }}>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                placeholder="Email Address"
                onChange={handleEmailChange}
                required
              />
              <button type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Participate"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>No event details available.</div>
      )}

      {/* Display success or error message */}
      {successMessage && <div>{successMessage} </div>}
      {errorMessage && <div> {errorMessage}</div>}
    </div>
  );
};

export default EventDetailsPage;
