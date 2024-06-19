import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "./Map";

const Geocode = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [error, setError] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const fetchHospitals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/Event/event_locations/"
      );
      setHospitals(response.data);
    } catch (err) {
      setError("Error fetching hospital data");
    }
  };
  const getCoordinates = async () => {
    fetchHospitals();
    const requests = hospitals.map(async (hospital) => {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        hospital
      )}&format=json&limit=1`;

      try {
        const response = await axios.get(url);
        if (response.data && response.data.length > 0) {
          const location = response.data[0];
          const latitude = parseFloat(location.lat);
          const longitude = parseFloat(location.lon);
          if (!isNaN(latitude) && !isNaN(longitude)) {
            return { latitude, longitude };
          } else {
            throw new Error("Invalid coordinates");
          }
        } else {
          throw new Error("Place not found");
        }
      } catch (err) {
        throw new Error("Error fetching data");
      }
    });

    try {
      const results = await Promise.all(requests);
      setCoordinates(results);
      console.log("Tableau des coordonnées :", results);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getCoordinates();
  }, []);

  return (
    <div>
      {/* <h2>Coordonnées des hôpitaux :</h2>
      <ul>
        {coordinates.map((coord, index) => (
          <li key={index}>
            Hôpital {index + 1}: Latitude {coord.latitude}, Longitude{" "}
            {coord.longitude}
          </li>
        ))}
      </ul> */}
      {error && <p>{error}</p>}
      <MapComponent coordinates={coordinates} />
    </div>
  );
};

export default Geocode;
