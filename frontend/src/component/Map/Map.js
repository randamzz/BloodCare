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

    // Ajoutez des marqueurs pour chaque coordonnée
    coordinates.forEach((coord, index) => {
      const latitude = parseFloat(coord.latitude);
      const longitude = parseFloat(coord.longitude);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        // Créez le popup pour chaque marqueur
        const popup = new maptilersdk.Popup({ offset: 25 }).setText(
          `Hôpital ${index + 1}`
        );

        // Créez l'élément de marqueur
        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage =
          el.style.backgroundImage = `url('/img/redMarker.png')`;

        el.style.backgroundSize = "cover";
        el.style.width = "50px";
        el.style.height = "50px";
        el.style.borderRadius = "50%";
        el.style.cursor = "pointer";

        // Ajoutez le marqueur à la carte
        new maptilersdk.Marker({ element: el })
          .setLngLat([longitude, latitude]) 
          .setPopup(popup)
          .addTo(map);
      }
    });

    // Fonction de nettoyage pour supprimer l'instance de la carte
    return () => {
      map.remove();
    };
  }, [coordinates]); // Réexécutez l'effet lorsque les coordonnées changent

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div
        id="map"
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
      />
    </div>
  );
};

export default MapComponent;
