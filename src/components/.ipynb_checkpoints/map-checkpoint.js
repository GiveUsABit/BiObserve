import React from "react";
import ReactMapGL, { Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Pins from "./pins";
import SightingInfo from "./sighting-info";

export const Map = ({
  children,
  viewport,
  onViewportChange,
  clickedSightingIndex,
  onSightingPinClicked,
  sightings = []
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
      <Pins 
        data={sightings}
        onClick={onSightingPinClicked}
        showPopup={clickedSightingIndex}
      />
      {clickedSightingIndex !== -1 && (
        <Popup
          longitude = {
            sightings[clickedSightingIndex].longitude
          }
          latitude = {
            sightings[clickedSightingIndex].latitude
          }
          closeButton={true}
          closeOnClick={false}
          autoPan={false}
          anchor={"bottom"}
          offsetTop={-15}
          dynamicPosition={false}
          onClose={() => onSightingPinClicked(null)}
          >
          <SightingInfo info = {sightings[clickedSightingIndex]} />
      </Popup>
      )}
        {children}
      </ReactMapGL>
    </div>
  );
};
