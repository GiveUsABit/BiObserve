import React, { useState, useMemo } from "react";
import { Map } from "../components/map";
import { Button } from "bloomer";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { BlackIcon } from "../helpers/black_icon";
import { faBinoculars } from "@fortawesome/free-solid-svg-icons"


const InputDiv = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 60%;
`;

const SightingButton = styled(Button)`
position: absolute;
bottom: 0.5em;
right: 1em;
height: 40px;
width: 40px;
z-index: 2;
border-radius: 50%;
  z-index: 2;
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
        <Link to="/sightings">
          <SightingButton>
            <BlackIcon icon={faBinoculars}/>
          </SightingButton>
        </Link>
      </Map>
    </>
  );
};
