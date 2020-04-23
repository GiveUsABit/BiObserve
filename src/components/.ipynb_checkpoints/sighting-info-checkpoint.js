import React, { PureComponent } from "react";
import styled from "@emotion/styled";
import { Container, Column, Button } from "bloomer";
import { Link } from "react-router-dom";

const OrganizationInfoContainer = styled.div`
  width: 60vw;
`;

const PopUp = styled(Container)`
  h1 {
    color: red;
    font-size: large;
    margin-bottom: 20px;
  }
`;

export default function({ info }) {
  var date = new Date(info.time);

  return (
    <OrganizationInfoContainer>
      <PopUp>
        <Column hasTextAlign="centered">
          <h1>
            {info.user.name} | {info.species}
          </h1>
          <p>
            {date.getMonth() +
              "/" +
              date.getDate() +
              "/" +
              date.getFullYear() +
              " | " +
              date.getHours() +
              ":" +
              date.getMinutes()}
          </p>
          <p>{info.description}</p>
          <div>
            {info.date}
          </div>
        </Column>
      </PopUp>
    </OrganizationInfoContainer>
  );
}
