import React, { useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const MapComponent = ({ coordinates }) => {
  useEffect(() => {
    maptilersdk.config.apiKey = "Umb4ZJh9NIXLtvjHjlS5";

    // Initialize the map
    const map = new maptilersdk.Map({
      container: "map",
      style: maptilersdk.MapStyle.STREETS,
      center:
        coordinates.length > 0
          ? [coordinates[0].longitude, coordinates[0].latitude]
          : [0, 0],
      zoom: 12,
    });

    // Add markers for each coordinate
    coordinates.forEach((coord, index) => {
      const latitude = parseFloat(coord.latitude);
      const longitude = parseFloat(coord.longitude);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        // Create popup for each marker
        const popup = new maptilersdk.Popup({ offset: 25 }).setText(
          `Hospital ${index + 1}`
        );

        // Create marker element
        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = `url('/img/redMarker.png')`;
        el.style.backgroundSize = "cover";
        el.style.width = "50px";
        el.style.height = "50px";
        el.style.borderRadius = "50%";
        el.style.cursor = "pointer";

        // Add marker to the map
        new maptilersdk.Marker({ element: el })
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(map);
      }
    });

    // Cleanup function to remove map instance
    return () => {
      map.remove();
    };
  }, [coordinates]); // Re-run effect when coordinates change

  return (
    <div>
    

      <div
      className="rounded-5"
        id="map"
        style={{
          position: "absolute",
          top: "15%",
          left: "2%",
          bottom: "5%",
          width: "50%",
          right: "2%",
        }}
      />
    </div>
  );
};

export default MapComponent;
