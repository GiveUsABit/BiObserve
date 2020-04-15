import React, { useState, useEffect} from "react";
import { Container, Button, Column, Columns } from "bloomer";
import styled from "@emotion/styled-base";
import { AddModal } from "../components/AddModal";
import { useAuth0 } from "../react-auth0-spa";
import { PanelBlock } from "bloomer/lib/components/Panel/PanelBlock";
import { Link } from "react-router-dom";
import {faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";
import { BlackIcon } from "../helpers/black_icon";
import { EventModal } from "../components/EventModal";


export const Profile = () => {
  

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusAddModal, setStatusAddModal] = useState(false);
  const { loading, user, isAuthenticated, logout, getTokenSilently } = useAuth0();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});

  useEffect(() => {
    const loadPosts = async () => {
      const token = await getTokenSilently();
      const body = await (await fetch('https://biobserve.herokuapp.com/v1/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({query: `query { posts { id, description, species}}`}),
      })).json();
      if (body.errors) {
        console.error(body.errors[0].message)
      } else {
        setPosts(body.data.posts)
      }
    }

    isAuthenticated && loadPosts()
   }, [isAuthenticated, getTokenSilently])

  const Avatar = styled(Container)`
    margin-top: auto .profile-picture {
      border-radius: 30%;
    }
  `;

  const MapButton = styled(Button)`
  position: absolute;
  bottom: 0.5em;
  right: 1em;
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

  const Post = styled(Container)`
    h1 {
      font-size: 36px;
      line-height: 40px;
      margin: 1em 0 0.6em 0;
      font-weight: normal;
      color: white;
      font-family: "Hammersmith One", sans-serif;

      position: relative;
      color: #6cf;
    }

    .title-line {
      white-space: nowrap;
      display: inline-block;
    }
    
    .button-line {
      display: inline-block;
      bottom: 500px;
    }
  `;

  const LogOut = styled(Button)`
    position: asbsolute;
    bottom: 0px;
  `;

  const EditButton = styled(Button)`
    margin: 10px;
  `;

  
  const PostContainer = styled(Container)`
    outline-style: solid;
    outline-width: thin;
    font-size: 0.9em;
    overflow: auto;
    margin: 5px;
  `;

  const AddButton = styled(Button)`
    position: absolute;
    right: 10px;
    margin: -10px;
  `;

  return (
    <>


      <Post>
        <div className="title-line">
          <h1>My Sightings</h1>
          </div>
          <AddModal
          isActive={statusAddModal}
          onModalClose={() => setStatusAddModal(false)}
          />

          <div className="button-line">
          <AddButton isOutlined isColor="primary"
            onClick={e => {
              setStatusAddModal(!statusAddModal);
            }}
          >Add Post</AddButton>
          </div>

        <EventModal
          isActive={statusModalOpen}
          data={selectedPost}
          onModalClose={() => setStatusModalOpen(false)}
        />

        <ul>
          {posts.map(post => (
            <PostContainer>
                <EditButton
                isColor="info"
                isOutlined
                onClick={e => {
                  
                  setStatusModalOpen(!statusModalOpen); 
                  setSelectedPost(post);
                
                }
              }
              >
                Edit
              </EditButton>
              <Column hasTextAlign="centered">
              <li key={post.id}>{post.species}</li>
              <p>{post.description}</p>
              </Column>
            </PostContainer>
          ))}
        </ul>
      </Post>

      <Link to="/">
        <MapButton>
          <BlackIcon icon={faMapMarkedAlt}></BlackIcon>
        </MapButton>
      </Link>

      <LogOut isColor="danger" isFullWidth onClick={() => logout()}>
        Log Out
      </LogOut>
    </>
  );
};
