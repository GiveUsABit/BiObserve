import React, { useState } from "react";
import {
    Panel,
    PanelBlock,
    PanelHeading,
    Input,
    Control,
    Container,
    Columns,
    Button,
    Column
} from "bloomer";
import { BlackIcon } from "../helpers/black_icon";
import { Link } from "react-router-dom";
import styled from "@emotion/styled-base";
import {faMapMarkedAlt, faSearch} from "@fortawesome/free-solid-svg-icons";
import { PanelTabs } from "bloomer/lib/components/Panel/PanelTabs";
import { PanelTab } from "bloomer/lib/components/Panel/PanelTab";
import { useQuery } from "@apollo/react-hooks";
import { getAllPosts } from "../queries";
import Collapsible from "react-collapsible";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const MapButton = styled(Button)`
  position: absolute;
  bottom: 0.5em;
  left: 1em;
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

const SightingContainer = styled(Container)`
  outline-style: solid;
  outline-width: thin;
  font-size: 0.9em;
  overflow: auto;
`;

const SightingCollapsible = styled(Collapsible)`
  font-size: 18px;
  margin: 10px;
`;


export const Sightings = () => {
    const [selectedPanel, setSelectedPanel] = useState("all");
    const [searchText, setSearchText] = useState("");

    const {loading,error,data} = useQuery(getAllPosts);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! ${error.message}</p>;

    const posts = data.posts
    .filter(postData => {
        return (
            (selectedPanel === "all" || postData.species === selectedPanel) &&
            postData.user.name.toLowerCase().includes(searchText.toLocaleLowerCase())
        )
    })
    .map(sighting => {
        var date = new Date(sighting.time);
        return (
            <SightingContainer>
                <SightingCollapsible trigger={sighting.user.name}>
                    <PanelBlock>
                        <Columns>
                            <Column isSize="3/4">
                                {sighting.description}
                            </Column>
                            <Column hasTextAlign="centered">
                                {sighting.species}
                            </Column>
                        </Columns>
                    </PanelBlock>
                </SightingCollapsible>
            </SightingContainer>
        )
    })
  return (
    <>
        <Panel>
            <PanelHeading>Recent Sightings</PanelHeading>
            <PanelBlock>
                <Control hasIcons="left">
                    <Input
                        value={searchText}
                        onChange={event => setSearchText(event.target.value)}
                        isSize="small"
                        placeholder="Find User Post"
                    />
                    <span className="icon is-left">
                        <FontAwesomeIcon icon={faSearch} size="xs" />
                    </span>
                </Control>
            </PanelBlock>
            <PanelTabs>
                <PanelTab
                    isActive={selectedPanel ==="all"}
                    onClick={() => setSelectedPanel("all")}
                    >
                    All
                </PanelTab>
                <PanelTab
                    isActive={selectedPanel ==="Flora"}
                    onClick={() => setSelectedPanel("Flora")}
                    >
                    Flora
                </PanelTab>
                <PanelTab
                    isActive={selectedPanel ==="Fauna"}
                    onClick={() => setSelectedPanel("Fauna")}
                    >
                    Fauna
                </PanelTab>
            </PanelTabs>
            {posts}
        </Panel>
        <Link to="/">
        <MapButton>
          <BlackIcon icon={faMapMarkedAlt}></BlackIcon>
        </MapButton>
      </Link>
    </>
  );
};
