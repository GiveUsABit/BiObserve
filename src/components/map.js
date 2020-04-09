import React from "react";
import ReactMapGL, { Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";


export const Map = ({
  children,
  viewport,
  onViewportChange,
}) => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactMapGL
        mapboxApiAccessToken={
          "pk.eyJ1IjoiZmxldGNoc3R1ZCIsImEiOiJjazFscmg3cnMwNnA3M2NrdmJyZGd4OHp1In0.AHuCxCzBGQnO-H-myqUY6A"
        }
        {...viewport}
        width={"100%"}
        height={"100%"}
        onViewportChange={onViewportChange}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
      </ReactMapGL>
    </div>
  );
};
