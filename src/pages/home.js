import React, { useState, useMemo } from "react";
import { Map } from "../components/map";
import { Button } from "bloomer";
import styled from "@emotion/styled";


const InputDiv = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 60%;
`;

const FriendsButton = styled(Button)`
  position: absolute;
  bottom: 0.5em;
  right: 1em;
  height: 40px;
  width: 40px;
  z-index: 2;
  border-radius: 50%;
`;

export const Home = () => {
  const [mapViewport, setMapViewport] = useState({
    latitude: 40.015,
    longitude: -105.2705,
    zoom: 14
  });

  return (
    <>
      <Map
        viewport={mapViewport}
        onViewportChange={setMapViewport}
      >
      </Map>
    </>
  );
};
