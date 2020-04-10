import React, { useState } from "react";
import {
  Button,
  Container,
} from "bloomer";
import { BlackIcon } from "../helpers/black_icon";
import { Link } from "react-router-dom";
import styled from "@emotion/styled-base";
import {faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";
import { PanelTabs } from "bloomer/lib/components/Panel/PanelTabs";
import { PanelTab } from "bloomer/lib/components/Panel/PanelTab";
import { useQuery } from "@apollo/react-hooks";
import { getAllPosts } from "../queries";



// Fix for FontAwesome icons

const MapButton = styled(Button)`
  position: absolute;
  bottom: 0.5em;
  left: 1em;
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

const OrganizationContainer = styled(Container)`
  outline-style: solid;
  outline-width: thin;
  font-size: 0.9em;
  overflow: auto;
`;


export const Sightings = () => {

    const {loading,error,data} = useQuery(getAllPosts);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! ${error.message}</p>;
    console.log(data);
  return (
    <>
        <Link to="/">
        <MapButton>
          <BlackIcon icon={faMapMarkedAlt}></BlackIcon>
        </MapButton>
      </Link>
    </>
  );
};
