import React, { useState, useMemo } from "react";
import { Map } from "../components/map";
import { Button } from "bloomer";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { BlackIcon } from "../helpers/black_icon";
import { faBinoculars, faPlusCircle, faUser } from "@fortawesome/free-solid-svg-icons"
import { getAllPosts } from "../queries";
import { useQuery } from "@apollo/react-hooks";

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
`;

const AddButton = styled(Button)`
  margin: 0 auto;
  display: block;
  top: 94%;
  border-radius: 50%;
`;

const ProfileButton = styled(Button)`
position: absolute;
bottom: 0.5em;
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

  const [clickedSightingId, setClickedSightingId] = useState(null);



  const { loading, error, data = { posts: [] }} = useQuery(
    getAllPosts
  );
  const clickedSightingIndex = useMemo(
    () =>
      data.posts.findIndex(({ post_id }) => post_id === clickedSightingId),
    [data.posts, clickedSightingId]
  );


  if(loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  const { sightings = [] } = data;

  return (
    <>
      <Map
        viewport={mapViewport}
        onViewportChange={setMapViewport}
        clickedSightingIndex={clickedSightingIndex}
        onSightingPinClicked={setClickedSightingId}
        sightings={data.posts}
      >
        <ProfileButton>
          <BlackIcon icon={faUser}/>
        </ProfileButton>

        <AddButton>
          <BlackIcon icon={faPlusCircle}/>
        </AddButton>

        <Link to="/sightings">
          <SightingButton>
            <BlackIcon icon={faBinoculars}/>
          </SightingButton>
        </Link>
      </Map>
    </>
  );
};
