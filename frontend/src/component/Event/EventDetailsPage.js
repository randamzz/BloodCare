import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./EventDetailsPage.css";

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
            "https://nominatim.openstreetmap.org/search",
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
        `http://localhost:8000/Event/events/${eventId}/generate_ticket/`,
        {
          email: email,
        }
      );
      setSuccessMessage(
        "Email submitted successfully. Check your inbox for the ticket!"
      );
      setEmail("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      setSuccessMessage("");
    }
    setSubmitting(false);
  };

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div>Error fetching event details: {error.message}</div>;

  return (
    <div className="event-details-container">
      {eventDetails ? (
        <div style={{ paddingTop: "40px" }} className="event-details">
          <img
            alt=""
            src="https://img.freepik.com/premium-vector/man-sitting-chair-with-medical-drip-nurse-collecting-blood-from-donor_11197-415.jpg?w=2000"
          />

          <h1>{eventDetails.eventname}</h1>
          <div className="single-post-inner-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris
              massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. Curabitur sodales ligula in libero. Sed dignissim
              lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In
              scelerisque sem at dolor. Maecenas mattis.
            </p>
          </div>
          <p className="single-post-meta">
            <i className="fa fa-user"></i>&nbsp; Blood Donor &nbsp; &nbsp;
            <i className="fa fa-share"></i>&nbsp; Donate Blood, Save Life
          </p>
          <div className="event-details-container">
            <div className="event-details">
              <h1>Event Details</h1>
              <table className="details-table">
                <tbody>
                  <tr>
                    <td className="details-header">Details</td>
                  </tr>
                  <tr>
                    <td className="details-label">Date:</td>
                    <td>
                      {new Date(
                        eventDetails.date_and_hour
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="details-label">Time:</td>
                    <td>
                      {new Date(
                        eventDetails.date_and_hour
                      ).toLocaleTimeString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="details-label">Cost:</td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td className="details-header">Organizer</td>
                  </tr>
                  <tr>
                    <td className="details-label">Association:</td>
                    <td>{eventDetails.association_or_hospital}</td>
                  </tr>
                  <tr>
                    <td className="details-label">Phone:</td>
                    <td>01 4537 8639 243</td>
                  </tr>
                  <tr>
                    <td className="details-header">Address</td>
                  </tr>
                  <tr>
                    <td className="details-label">Location:</td>
                    <td>{eventDetails.location}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

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
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default EventDetailsPage;
