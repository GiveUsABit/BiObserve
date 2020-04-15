import React, { useState, useMemo } from "react";
import { Map } from "../components/map";
import { Button } from "bloomer";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { BlackIcon } from "../helpers/black_icon";
import { faBinoculars, faPlusCircle, faUser } from "@fortawesome/free-solid-svg-icons"
import { getAllPosts } from "../queries";
import { useQuery } from "@apollo/react-hooks";
import { AddModal } from "../components/AddModal";
import { useAuth0 } from "../react-auth0-spa";


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
left: 1em;
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

  const [statusAddModal, setStatusAddModal] = useState(false);
  const {  user } = useAuth0();


  const { loading, error, data = { posts: [] }} = useQuery(
    getAllPosts
  );
  const clickedSightingIndex = useMemo(
    () =>
      data.posts.findIndex(({ id }) => id === clickedSightingId),
    [data.posts, clickedSightingId]
  );


  if(loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;
  if(!user){
    return <div>Please Login</div>
  }

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
        <Link to="/profile">
          <ProfileButton>
            <BlackIcon icon={faUser}/>
          </ProfileButton>
        </Link>

        <AddModal
          isActive={statusAddModal}
          onModalClose={() => setStatusAddModal(false)}
        />

        <AddButton>
          <BlackIcon 
            icon={faPlusCircle}
            onClick={e => {
              setStatusAddModal(!statusAddModal);
            }}
          />
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
