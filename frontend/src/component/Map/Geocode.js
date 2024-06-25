import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "./Map";

const Geocode = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [error, setError] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
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
      await fetchHospitals();

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
            return { latitude, longitude };
          } else {
            return null;
          }
        } catch (err) {
          console.error("Error fetching coordinates for", hospital, err);
          return null;
        }
      });

      const results = await Promise.all(requests);

      const filteredCoordinates = results.filter((coord) => coord !== null);
      setCoordinates(filteredCoordinates);
    };

    getCoordinates();
  }, []);

  return (
    <div>
      {error ? <p>{error}</p> : <MapComponent coordinates={coordinates} />}
    </div>
  );
};

export default Geocode;
